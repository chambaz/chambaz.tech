import gsap from 'gsap'

const animateEnter = (props) => {
  gsap.to(props.heading.current, {
    y: (window.innerHeight / 2) * -1,
    opacity: 0.1,
    duration: 0.75,
    delay: 0.15,
  })

  gsap.to(props.canvas.current, {
    y: (window.innerHeight / 2) * -1,
    opacity: 0.1,
    duration: 0.75,
  })

  gsap.to(props.description.current, {
    opacity: 1,
    delay: 0.75,
    duration: 0.75,
  })

  props.description.current.style.pointerEvents = 'all'
}

const animateLeave = (props) => {
  gsap.to(props.heading.current, {
    y: 0,
    opacity: 1,
    duration: 0.75,
    delay: 0.35,
  })

  gsap.to(props.canvas.current, {
    y: 0,
    opacity: 1,
    duration: 0.75,
    delay: 0.2,
  })

  gsap.to(props.description.current, {
    opacity: 0,
    duration: 0.25,
    overwrite: true,
  })

  props.description.current.style.pointerEvents = 'none'
}

const activateDescription = () => {
  gsap.to(document.querySelector('#slides'), {
    duration: 0.5,
    scrollTo: document.querySelector('#slide2'),
  })
}

const deactivateDescription = () => {
  gsap.to(document.querySelector('#slides'), {
    duration: 1,
    scrollTo: document.querySelector('#slide1'),
  })
}

export {
  animateEnter,
  animateLeave,
  activateDescription,
  deactivateDescription,
}
