import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        
        Made with <img src="/yarn.png" alt="Netlify Logo" className={styles.logo} /> by Yarn Development and Next.js
      </footer>
    </>
  )
}
