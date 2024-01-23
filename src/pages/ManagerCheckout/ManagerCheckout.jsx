import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllCheckout } from '../../redux/features/checkout/checkoutSlice';

export default function ManagerCheckout() {

  const dispatch = useDispatch();
  const {checkoutList} = useSelector(state => state.checkoutSlice)

  useEffect(()=>{
    dispatch(getAllCheckout())
  },[])

  console.log("checkout",checkoutList);

  return (
    <div>
         <h2>Manage Checkout</h2>
      <div className='pt-4'>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Account Number</th>
            <th scope="col">Bank</th>
            <th scope="col">Money Pay</th>
            <th scope="col">Create At</th>
          </tr>
        </thead>
        <tbody>
            {
              checkoutList?.map((item,index)=>(
                <tr key={index}>
                <th scope="row">{index}</th>
                <td>{item?.email}</td>
                <td>{item?.accountNumber}</td>
                <td>{item?.bank}</td>
                <td>{item?.moneyPay}</td>
                <td>{item?.createdAt}</td>
              </tr>
              ))
            }

        </tbody>
      </table>
      </div>


    </div>
  )
}
