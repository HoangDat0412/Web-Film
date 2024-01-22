import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListCommentApi, postCommentApi } from '../../redux/features/comment/commentSlice'
import * as Yup from 'yup';
import { useFormik } from 'formik';
export default function Comment(props) {
    const { id } = props
    const dispatch = useDispatch()
    const { listComment } = useSelector(state => state.commentSlice)
    useEffect(() => {
        dispatch(getListCommentApi(id))
    }, [])

    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        validationSchema: Yup.object({
            comment: Yup.string().required(""),
        }),
        onSubmit: values => {
            console.log("values", values);
            dispatch(postCommentApi({
                filmId:id,
                comment:values.comment
            }))
        },
    });

    return (
        <div className='comment pt-5 pb-5'>
            <div className="container bootdey">
                <div className="col-md-12 bootstrap snippets">
                    <div className="panel">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="panel-body d-flex align-items-center">
                                <textarea className="form-control" rows={2}
                                    id="comment"
                                    name="comment"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.comment} placeholder="What are you thinking?" />
                                <div className="mar-top clearfix">
                                    <button className="btn btn-sm btn-primary pull-right" type="submit">Share</button>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="panel mt-4 p-3" style={{
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                    }}>
                        <div className="panel-body ">
                            {listComment?.map((comment, index) => (
                                <div className="media-block pb-4" key={index}>
                                    <div className="media-body d-flex ">
                                        <div className="mar-btm pe-3" style={{
                                            borderRight: "solid 1px rgba(33, 37, 41, 0.75)"
                                        }}>
                                            <button className='btn btn-dark'>{comment.userName}</button>
                                            <p className="text-muted text-sm">From : {comment?.createdAt}</p>
                                        </div>
                                        <p className='ps-3'>
                                            {comment?.comment}
                                        </p>
                                        <hr />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
