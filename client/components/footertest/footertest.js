// Footer.js

import React from 'react'
import styles from '@/components/footertest/footertest.module.scss'

function Footer() {
  return (
    <footer className="text-light py-4 mt-5">
      <div className="container">
        <div className="row ">
          {/* <div className=" pt-5 text-center">
            © 2023 The Lazy Forest, Inc. All rightsreserved
          </div>
          <div className="bg-success ms-auto">22</div> */}
          <div className="col-11 bg-dark py-5 ">
            © 2023 The Lazy Forest, Inc. All rightsreserved
          </div>
          <div className={`col-1 bg-primary py-3 text-dark d-flex `}>
            <div>
              <i class="bi bi-arrow-up-square fs-3"></i>
            </div>
            <div className={`${styles.back}`}>back to top</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
