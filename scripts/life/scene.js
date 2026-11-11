import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function createScene(host, width, height, onLost, onPaint, onDrawing) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.append(renderer.domElement)

  const scene = new THREE.Scene()
  const scale = Math.max(width / 20, height / 16)
  const camera = new THREE.OrthographicCamera(
    -14,
    14,
    12,
    -12,
    0.1,
    100 * scale,
  )
  camera.position.set(24 * scale, 30 * scale, 32 * scale)
  camera.lookAt(0, 0, 0)
  camera.updateMatrixWorld()
  const group = new THREE.Group()
  scene.add(group)

  const geometry = new RoundedBoxGeometry(0.82, 1, 0.82, 2, 0.035)
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.85,
    metalness: 0.05,
  })
  const mesh = new THREE.InstancedMesh(geometry, material, width * height)
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  mesh.castShadow = true
  mesh.receiveShadow = true
  // Matrices change height, but the board always remains inside this bounding sphere.
  mesh.boundingSphere = new THREE.Sphere(
    new THREE.Vector3(),
    Math.hypot(width, height),
  )
  group.add(mesh)

  const baseDepth = 0.35
  const boardDepth = 0.9
  const floorGeometry = new RoundedBoxGeometry(
    width,
    boardDepth,
    height,
    2,
    0.08,
  )
  const floorMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.9,
    metalness: 0.05,
  })
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.position.y = -baseDepth - boardDepth / 2
  floor.receiveShadow = true
  group.add(floor)

  const fill = new THREE.HemisphereLight('#ffffff', '#7c8974', 2.5)
  scene.add(fill)
  const key = new THREE.DirectionalLight('#ffffff', 3)
  key.position.set(-8 * scale, 20 * scale, 10 * scale)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  Object.assign(key.shadow.camera, {
    left: -17 * scale,
    right: 17 * scale,
    top: 17 * scale,
    bottom: -17 * scale,
    near: 0.5,
    far: 60 * scale,
  })
  key.shadow.normalBias = 0.04
  scene.add(key)

  const dead = new THREE.Color()
  const alive = new THREE.Color()
  const color = new THREE.Color()
  const matrix = new THREE.Object3D()
  let lost = false
  let disposed = false
  let viewport = host.getBoundingClientRect()
  const corners = []
  for (const x of [-width / 2, width / 2]) {
    for (const y of [-baseDepth - boardDepth, 1]) {
      for (const z of [-height / 2, height / 2])
        corners.push(new THREE.Vector3(x, y, z))
    }
  }
  const projected = new THREE.Vector3()

  function frameBoard() {
    const { width: w, height: h, right } = viewport
    if (!w || !h) return
    camera.updateMatrixWorld()
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity
    for (const corner of corners) {
      projected.copy(corner).applyMatrix4(camera.matrixWorldInverse)
      minX = Math.min(minX, projected.x)
      maxX = Math.max(maxX, projected.x)
      minY = Math.min(minY, projected.y)
      maxY = Math.max(maxY, projected.y)
    }
    const desktop = matchMedia('(min-width: 64rem)').matches
    const phone = matchMedia('(max-width: 40rem)').matches
    const padding = 24
    const rightInset = desktop
      ? Math.max(padding, right - (innerWidth - padding))
      : padding
    const aspect = w / h
    const halfHeight =
      Math.max(
        height / 2 + 1,
        (width / 2 + 6) / aspect,
        (maxY - minY) / (2 * (1 - (2 * padding) / h)),
        (maxX - minX) / (2 * aspect * (1 - (padding + rightInset) / w)),
      ) / (phone ? 1.2 : 1)
    const viewWidth = halfHeight * aspect * 2
    // Fit the board on viewport resize; keep this framing fixed while rotating.
    camera.right = desktop
      ? maxX + (viewWidth * rightInset) / w
      : (minX + maxX + viewWidth) / 2
    camera.left = camera.right - viewWidth
    camera.top = (minY + maxY) / 2 + halfHeight
    camera.bottom = (minY + maxY) / 2 - halfHeight
    camera.updateProjectionMatrix()
    projected.set(0, 0, 0).project(camera)
    host.style.setProperty('--board-center-x', `${(projected.x + 1) * 50}%`)
    host.style.setProperty('--board-center-y', `${(1 - projected.y) * 50}%`)
  }

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = false
  controls.enableZoom = false
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: null,
    RIGHT: null,
  }
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: null }
  controls.minPolarAngle = Math.PI / 36
  controls.maxPolarAngle = Math.PI * 0.45
  controls.rotateSpeed = 0.65
  controls.autoRotateSpeed = 0.25
  // Direct manipulation has no momentum.
  controls.enableDamping = false
  controls.saveState()
  let editing = false
  let pointerId = null
  const activePointers = new Set()
  let keyboardIdleAt = 0
  let paintValue = 1
  let previousCell = null
  let selected = Math.floor(height / 2) * width + Math.floor(width / 2)
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  const hit = new THREE.Vector3()
  const cursorGeometry = new THREE.BoxGeometry(0.95, 0.04, 0.95)
  const cursorMaterial = new THREE.MeshBasicMaterial({
    color: '#d6b86c',
    wireframe: true,
  })
  const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial)
  cursor.visible = false
  scene.add(cursor)

  function selectCell(index) {
    selected = index
    cursor.position.set(
      (index % width) - (width - 1) / 2,
      0.85,
      Math.floor(index / width) - (height - 1) / 2,
    )
    host.setAttribute(
      'aria-label',
      `Draw your starting world. Column ${(index % width) + 1}, row ${Math.floor(index / width) + 1}.`,
    )
  }
  function cellAt(event) {
    const rect = renderer.domElement.getBoundingClientRect()
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      1 - ((event.clientY - rect.top) / rect.height) * 2,
    )
    raycaster.setFromCamera(pointer, camera)
    if (!raycaster.ray.intersectPlane(plane, hit)) return null
    const x = Math.floor(hit.x + width / 2)
    const z = Math.floor(hit.z + height / 2)
    return x >= 0 && x < width && z >= 0 && z < height ? z * width + x : null
  }
  function pointerDown(event) {
    activePointers.add(event.pointerId)
    if (cursor.visible) {
      cursor.visible = false
      draw()
    }
    if (!editing || pointerId !== null || event.button !== 0) return
    const index = cellAt(event)
    if (index === null) return
    event.preventDefault()
    onDrawing('start')
    pointerId = event.pointerId
    renderer.domElement.setPointerCapture(pointerId)
    previousCell = index
    selectCell(index)
    paintValue = onPaint(index)
  }
  function pointerMove(event) {
    if (!editing || event.pointerId !== pointerId) return
    const index = cellAt(event)
    if (index === null) {
      previousCell = null
      return
    }
    const from = previousCell ?? index
    const x = from % width,
      z = Math.floor(from / width)
    const dx = (index % width) - x,
      dz = Math.floor(index / width) - z
    const steps = Math.max(Math.abs(dx), Math.abs(dz), 1)
    for (let i = 1; i <= steps; i++) {
      onPaint(
        Math.round(z + (dz * i) / steps) * width +
          Math.round(x + (dx * i) / steps),
        paintValue,
      )
    }
    previousCell = index
    selectCell(index)
  }
  function pointerEnd() {
    if (pointerId !== null && renderer.domElement.hasPointerCapture(pointerId))
      renderer.domElement.releasePointerCapture(pointerId)
    pointerId = null
    previousCell = null
  }
  function pointerUp(event) {
    if (event.pointerId !== pointerId) return
    pointerEnd()
    onDrawing('end')
  }
  function releaseInteraction(event) {
    activePointers.delete(event.pointerId)
  }
  function rotate(delta) {
    if (activePointers.size || performance.now() < keyboardIdleAt) return
    controls.autoRotate = true
    controls.update(delta)
    controls.autoRotate = false
  }
  function keyup(event) {
    if (
      editing &&
      event.target === host &&
      [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Enter',
        ' ',
      ].includes(event.key)
    )
      onDrawing('keyboard')
  }
  function setEditing(value) {
    pointerEnd()
    editing = value
    controls.enabled = !value
    host.dataset.editing = String(value)
    cursor.visible = value && host.matches(':focus-visible')
    if (value) selectCell(selected)
    else host.setAttribute('aria-label', 'Interactive Game of Life grid')
    draw()
  }
  function focus() {
    cursor.visible = editing && host.matches(':focus-visible')
    draw()
  }
  function blur() {
    cursor.visible = false
    draw()
  }
  renderer.domElement.addEventListener('pointerdown', pointerDown)
  renderer.domElement.addEventListener('pointermove', pointerMove)
  renderer.domElement.addEventListener('pointerup', pointerUp)
  renderer.domElement.addEventListener('pointercancel', pointerEnd)
  renderer.domElement.addEventListener('lostpointercapture', pointerEnd)
  renderer.domElement.addEventListener('lostpointercapture', releaseInteraction)
  window.addEventListener('pointerup', releaseInteraction)
  window.addEventListener('pointercancel', releaseInteraction)
  host.addEventListener('focus', focus)
  host.addEventListener('blur', blur)
  host.addEventListener('keyup', keyup)
  function draw() {
    if (!lost && !disposed) {
      renderer.render(scene, camera)
    }
  }
  function controlsChanged() {
    // The animation loop renders after automatic rotation and cell updates.
    if (!controls.autoRotate) draw()
  }
  controls.addEventListener('change', controlsChanged)
  function resetView() {
    controls.reset()
  }
  function keydown(event) {
    if (event.target !== host) return
    keyboardIdleAt = performance.now() + 1000
    if (editing) {
      if (
        ![
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Enter',
          ' ',
        ].includes(event.key)
      )
        return
      cursor.visible = true
      onDrawing('start')
      const x = selected % width,
        z = Math.floor(selected / width)
      const moves = {
        ArrowLeft: [Math.max(0, x - 1), z],
        ArrowRight: [Math.min(width - 1, x + 1), z],
        ArrowUp: [x, Math.max(0, z - 1)],
        ArrowDown: [x, Math.min(height - 1, z + 1)],
      }
      if (event.key in moves) {
        event.preventDefault()
        const [nextX, nextZ] = moves[event.key]
        selectCell(nextZ * width + nextX)
        draw()
      } else if (event.key === 'Enter' || event.code === 'Space') {
        event.preventDefault()
        if (!event.repeat) onPaint(selected)
      }
      return
    }
    const directions = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowDown: 1,
    }
    if (event.key in directions) {
      event.preventDefault()
      const offset = camera.position.clone().sub(controls.target)
      const position = new THREE.Spherical().setFromVector3(offset)
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
        position.theta += directions[event.key] * 0.1
      else
        position.phi = THREE.MathUtils.clamp(
          position.phi + directions[event.key] * 0.1,
          controls.minPolarAngle,
          controls.maxPolarAngle,
        )
      camera.position
        .copy(controls.target)
        .add(offset.setFromSpherical(position))
      controls.update()
    }
    if (event.key === 'Home') {
      event.preventDefault()
      resetView()
    }
  }
  host.addEventListener('keydown', keydown)

  function theme() {
    const dark = document.documentElement.classList.contains('dark')
    dead.set(dark ? '#30382e' : '#dce2d6')
    alive.set(dark ? '#9ab78c' : '#668253')
    fill.intensity = dark ? 1.8 : 2.5
    key.intensity = dark ? 2.3 : 3
    floorMaterial.color.set(dark ? '#252d23' : '#bac5b2')
  }
  function resize() {
    viewport = host.getBoundingClientRect()
    const { width: w, height: h } = viewport
    if (!w || !h) return
    frameBoard()
    renderer.setSize(w, h, false)
  }
  function render(levels) {
    if (lost || disposed) return
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i]
      const cellHeight = baseDepth + level * 0.78
      matrix.position.set(
        (i % width) - (width - 1) / 2,
        cellHeight / 2 - baseDepth,
        Math.floor(i / width) - (height - 1) / 2,
      )
      matrix.scale.set(1, cellHeight, 1)
      matrix.updateMatrix()
      mesh.setMatrixAt(i, matrix.matrix)
      mesh.setColorAt(i, color.copy(dead).lerp(alive, level))
    }
    mesh.instanceMatrix.needsUpdate = true
    mesh.instanceColor.needsUpdate = true
    draw()
  }
  function contextLost(event) {
    event.preventDefault()
    lost = true
    onLost()
  }
  renderer.domElement.addEventListener('webglcontextlost', contextLost)
  theme()
  resize()

  return {
    theme,
    resize,
    render,
    rotate,
    resetView,
    setEditing,
    dispose() {
      if (disposed) return
      disposed = true
      host.removeEventListener('keydown', keydown)
      host.removeEventListener('focus', focus)
      host.removeEventListener('blur', blur)
      host.removeEventListener('keyup', keyup)
      pointerEnd()
      renderer.domElement.removeEventListener('pointerdown', pointerDown)
      renderer.domElement.removeEventListener('pointermove', pointerMove)
      renderer.domElement.removeEventListener('pointerup', pointerUp)
      renderer.domElement.removeEventListener('pointercancel', pointerEnd)
      renderer.domElement.removeEventListener('lostpointercapture', pointerEnd)
      renderer.domElement.removeEventListener(
        'lostpointercapture',
        releaseInteraction,
      )
      window.removeEventListener('pointerup', releaseInteraction)
      window.removeEventListener('pointercancel', releaseInteraction)
      cursorGeometry.dispose()
      cursorMaterial.dispose()
      controls.removeEventListener('change', controlsChanged)
      controls.dispose()
      renderer.domElement.removeEventListener('webglcontextlost', contextLost)
      mesh.dispose()
      geometry.dispose()
      material.dispose()
      floorGeometry.dispose()
      floorMaterial.dispose()
      key.shadow.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
