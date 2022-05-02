import Head from 'next/head'

import styles from '@/pages/index.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.8.0/dist/leaflet.css'
          integrity='sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=='
          crossOrigin=''
        />
      </Head>
    </div>
  )
}
