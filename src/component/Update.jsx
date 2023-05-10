import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import * as yup from "yup";
import {ErrorMessage, Field, Formik} from "formik";

const UpdateTour = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/tours/${id}`)
            .then((response) => {
                setTour(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const initialValues = {
        title: tour.title || '',
        price: tour.price || '',
        description: tour.description || '',
    };

    const validationSchema = yup.object({
        title: yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        price: yup.number().required('price is required'),
        description: yup.string().required("required"),
    });

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    axios
                        .put(`http://localhost:3000/tours/${id}`, values)
                        .then(() => {
                            navigate('/');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <Field name={'title'}></Field>
                        <ErrorMessage name="title"/>

                        <Field name={'price'}></Field>
                        <ErrorMessage name="price"/>

                        <Field name={'description'}></Field>
                        <ErrorMessage name="description"/>

                        <button>Update Tours</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateTour;