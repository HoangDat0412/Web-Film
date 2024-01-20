import React from 'react'

export default function Footer() {
  return (
    <div className='footer bg-dark text-light' style={{ padding: "30px 0" }} >
      <div className='container-fluid'>
        <div className="row" style={{ gap: "20px" }}>
          <div className="col-12">
            <h3>ĐẬU PHIM</h3>
          </div>
          <div className=' col-12 '>
            <div className="row" style={{ fontSize: "15px" }}>
              <div className="col-4 d-flex justify-content-center">
                <div>
                  <h5>Phim Mới</h5>
                  <p>
                    Phim Khoa Học</p>
                  <p>Phim Kinh Dị</p>
                  <p>Phim Chiếu Rạp</p>
                  <p>Phim Hình Sự</p>
                  <p>Phim Hành Động</p>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <div>
                  <h5>Phim Hay</h5>
                  <p>
                    Phim Khoa Học</p>
                  <p>Phim Âu Mỹ</p>
                  <p>Phim Hàn Quốc</p>
                  <p>Phim Trung Quốc</p>
                  <p>Phim Nhật Bản</p>
                </div>
              </div>

              <div className="col-4 d-flex justify-content-center">
                <div> <h5>Thông Tin</h5>
                  <p>
                    Liên Hệ </p>
                  <p>Giới Thiệu</p>
                  <p>Điều Khoản</p>
                  <p>Riêng Tư</p>
                  <p>Bản Quyền</p></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
