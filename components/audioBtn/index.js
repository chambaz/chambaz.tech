import { IoMdVolumeOff } from 'react-icons/io'

import styles from './audioBtn.module.css'

const AudioBtn = (props) => {
  return (
    <button className={styles.audioBtn}>
      <IoMdVolumeOff />
    </button>
  )
}

export default AudioBtn
