import React from 'react'
import { FaTwitterSquare } from 'react-icons/fa'
import { FaMedium } from 'react-icons/fa'
import { FaGithubSquare } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { AiFillCodepenSquare } from 'react-icons/ai'
import { ImSoundcloud2 } from 'react-icons/im'

import styles from './description.module.css'

const Description = (props) => {
  return (
    <div ref={props.descriptionRef} className={styles.description}>
      <p>
        Head of Technology at{' '}
        <a href="https://www.digitalsurgeons.com/">Digital Surgeons</a>.
        <br /> Creative engineer, marketer, musician, maker.
        <br /> I write <a href="https://chambaz.medium.com/">here</a>, do
        creative coding <a href="https://codepen.io/chambaz">here</a>, and make
        music{' '}
        <a
          className={styles.descriptionComingSoonLink}
          href="#"
          title="Coming soon">
          here
        </a>
        .
      </p>
      <ul className={styles.descriptionList}>
        <li className={styles.descriptionListItem}>
          <a
            className={styles.descriptionListItemLink}
            href="https://twitter.com/chambaz">
            <FaTwitterSquare />
          </a>
        </li>
        <li className={styles.descriptionListItem}>
          <a
            className={styles.descriptionListItemLink}
            href="https://www.linkedin.com/in/adamchambersds/">
            <FaLinkedin />
          </a>
        </li>
        <li className={styles.descriptionListItem}>
          <a
            className={styles.descriptionListItemLink}
            href="https://chambaz.medium.com/">
            <FaMedium />
          </a>
        </li>
        <li className={styles.descriptionListItem}>
          <a
            className={styles.descriptionListItemLink}
            href="https://github.com/chambaz/">
            <FaGithubSquare />
          </a>
        </li>
        <li className={styles.descriptionListItem}>
          <a
            className={`${styles.descriptionListItemLink} ${styles.descriptionListItemLinkCodePen}`}
            href="https://codepen.io/chambaz">
            <AiFillCodepenSquare />
          </a>
        </li>
        <li className={styles.descriptionListItem}>
          <a
            className={`${styles.descriptionListItemLink} ${styles.descriptionListItemLinkSoundCloud} ${styles.descriptionComingSoonLink}`}
            href="#"
            title="Coming soon">
            <ImSoundcloud2 />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Description
