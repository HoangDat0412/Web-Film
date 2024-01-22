import React, { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCheckoutApi } from '../../../redux/features/user/userSlice'

function UserCheckout() {
  const { userCheckoutList } = useSelector(state => state.userSlice)
  console.log("user checkout list",userCheckoutList);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserCheckoutApi())
  }, [])

  let tongTien = 0;
  userCheckoutList?.map((item)=>(
      tongTien += parseInt(item?.moneyPay)
  ))

  return (
    <div className="table-responsive container">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr className="whitespace-nowrap">
            <th scope="col">STT</th>
            <th scope="col">Số Tài Khoản</th>
            <th scope="col">Ngân Hàng</th>
            <th scope="col">Ngày Thanh Toán</th>
            <th scope="col">Số Tiền</th>
          </tr>
        </thead>
        <tbody>
          {userCheckoutList?.map((item, index) => (
              <tr key={item.id} className="whitespace-nowrap">
                <th scope="row">{index + 1}</th>
                <td>{item?.accountNumber}</td>
                <td>{item?.bank}</td>
               
                <td>
                  {item?.createdAt}
                </td>
                <td>{item?.moneyPay}</td>
              </tr>
            ))
            }
            <tr>
                <td colSpan="4">Tổng Tiền</td>
                <td>{tongTien}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}
export default memo(UserCheckout)