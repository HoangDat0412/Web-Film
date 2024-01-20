import React from 'react';
import qr from "../../assests/img/qr.jpg";
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch,useSelector } from 'react-redux';
import { checkOutApi } from '../../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {chechOutResult,chechOutError} = useSelector(state => state.userSlice)
  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      bank:""
    },
    validationSchema: Yup.object({
      accountNumber: Yup.string().required("*Số tài khoản không được bỏ trống !"),
      bank: Yup.string().required("*Ngân hàng không được bỏ trống !"),

    }),
    onSubmit: values => {
      console.log("values",values);
      dispatch(checkOutApi())
      if(chechOutResult){
        Swal.fire({
          title: "Bạn đã checkout thành công",
          icon: "success"
        });
        navigate("/",)
      }
      if(chechOutError){
        Swal.fire({
          title: "Checkout thất bại",
          icon: "error"
        });
      }
    },
  });
  return (
  <div className="container pt-4 pb-4">
  <h1 className="h3 mb-5">Payment</h1>
  <form onSubmit={formik.handleSubmit}>
  <div className="row">
    {/* Left */}
    <div className="col-lg-9">
      
        {/* Credit card */}
        <div className="accordion-item mb-3">
          <h2 className="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
            <div className="form-check w-100 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseCC" aria-expanded="false">
              <input className="form-check-input" type="radio" name="payment" id="payment1" />
              <label className="form-check-label pt-1" htmlFor="payment1">
                VN PAY
              </label>
            </div>
            <span>
              <svg width={34} height={25} xmlns="http://www.w3.org/2000/svg">
                <g fillRule="nonzero" fill="#333840">
                  <path d="M29.418 2.083c1.16 0 2.101.933 2.101 2.084v16.666c0 1.15-.94 2.084-2.1 2.084H4.202A2.092 2.092 0 0 1 2.1 20.833V4.167c0-1.15.941-2.084 2.102-2.084h25.215ZM4.203 0C1.882 0 0 1.865 0 4.167v16.666C0 23.135 1.882 25 4.203 25h25.215c2.321 0 4.203-1.865 4.203-4.167V4.167C33.62 1.865 31.739 0 29.418 0H4.203Z" />
                  <path d="M4.203 7.292c0-.576.47-1.042 1.05-1.042h4.203c.58 0 1.05.466 1.05 1.042v2.083c0 .575-.47 1.042-1.05 1.042H5.253c-.58 0-1.05-.467-1.05-1.042V7.292Zm0 6.25c0-.576.47-1.042 1.05-1.042H15.76c.58 0 1.05.466 1.05 1.042 0 .575-.47 1.041-1.05 1.041H5.253c-.58 0-1.05-.466-1.05-1.041Zm0 4.166c0-.575.47-1.041 1.05-1.041h2.102c.58 0 1.05.466 1.05 1.041 0 .576-.47 1.042-1.05 1.042H5.253c-.58 0-1.05-.466-1.05-1.042Zm6.303 0c0-.575.47-1.041 1.051-1.041h2.101c.58 0 1.051.466 1.051 1.041 0 .576-.47 1.042-1.05 1.042h-2.102c-.58 0-1.05-.466-1.05-1.042Zm6.304 0c0-.575.47-1.041 1.051-1.041h2.101c.58 0 1.05.466 1.05 1.041 0 .576-.47 1.042-1.05 1.042h-2.101c-.58 0-1.05-.466-1.05-1.042Zm6.304 0c0-.575.47-1.041 1.05-1.041h2.102c.58 0 1.05.466 1.05 1.041 0 .576-.47 1.042-1.05 1.042h-2.101c-.58 0-1.05-.466-1.05-1.042Z" />
                </g>
              </svg>
            </span>
          </h2>
          <div id="collapseCC" className="accordion-collapse collapse show" data-bs-parent="#accordionPayment" style={{}}>
            <div className="accordion-body">

              <div className="mb-3">
                <label className="form-label">Số tài khoản</label>
                <input
                id="accountNumber"
                name="accountNumber"
                className="form-control"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.accountNumber}
              />
                            {formik.touched.accountNumber && formik.errors.accountNumber ? (
                <div style={{ color: "red" }}>{formik.errors.accountNumber}</div>
              ) : null}
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    
                    <label className="form-label">Ngân hàng</label>
                    <input
                id="bank"
                name="bank"
                className="form-control"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bank}
              />
                {formik.touched.bank && formik.errors.bank ? (
                <div style={{ color: "red" }}>{formik.errors.bank}</div>
              ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    
    <div className="col-lg-3">
      <div className="card position-sticky top-0">
        <div className="p-3 bg-light bg-opacity-10">
          <h6 className="card-title mb-3">Vip User </h6>

          <div className='d-flex justify-content-center'>
          <img src={qr} width={"70%"}alt="" />
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-4 small">
            <span>TOTAL</span> <strong className="text-dark">200000 VND</strong>
          </div>
          <div className="form-check mb-1 small">
            <input className="form-check-input" type="checkbox" defaultValue id="tnc" />
            <label className="form-check-label" htmlFor="tnc">
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
          <button type='submit' className="btn btn-primary w-100 mt-2">Payment</button>
        </div>
      </div>
    </div>
  </div>
  </form>
</div>

  )
}
