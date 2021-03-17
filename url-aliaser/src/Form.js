import { useState, useRef } from 'react';
import { isValidUrl } from './urlValidator';
import { db } from './firebase';

export default function Form () {
    const [data, setData] = useState({
        url: '',
        alias: ''
    })

    const [errorMessages, setErrorMessages] = useState({
        url: '',
        alias: ''
    })

    const [response, setResponse] = useState({
        message: '',
        status: ''
    });

    const urlRef = useRef(null);
    const aliasRef = useRef(null)

    function handleChange(event) {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    function handleValidation(name, value) {
        let isValid = true

        if (value.length === 0) {
            setErrorMessages(previousErrorMessages => ({
                ...previousErrorMessages,
                [name]: 'Hiányzó érték'
            }))
            isValid = false
            return isValid
        }

        if (name === 'url') {
            if (isValidUrl(value) === false) {
                setErrorMessages(previousErrorMessages => ({
                    ...previousErrorMessages,
                    [name]: 'Érvénytelen formátum'
                }))
                isValid = false;
                return isValid
            }
        }

        return isValid
    }

    async function controlAliasExists(value) {
        let stage = true;

        await db.collection('aliases').where('alias', '==', value)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.docs.length > 0) {
                    setResponse({
                        message: `A(z) ${value} már létezik`,
                        status: 'negative'
                    })
                    stage = false;
                }
            })
            .catch(error => {
                console.error(error)
                stage = false
            })
        return stage
    }

    function handleOnFocus(event) {
        setErrorMessages({
            ...errorMessages,
            [event.target.name]: ''
        })
    }

    async function handleSubmitForm(event) {
        event.preventDefault();

        setResponse({
            message: '',
            status: ''
        })

        let isValidForm = true;

        Object.keys(errorMessages).forEach(name => {
            if (handleValidation(name, data[name]) === false) {
                isValidForm = false;
            }
        })

        if (isValidForm === true) {
            isValidForm = await controlAliasExists(data.alias)
        }


        if (isValidForm === true) {
            const secretCode = Math.floor(Math.random() * (9000) + 1000)

            db.collection('aliases').add({
                ...data,
                secretCode: secretCode,
                hitCount: 0
            })
                .then(() => {
                    setResponse({
                        message: `Sikeres mentés, a törléshez szükséges kód: ${secretCode}`,
                        status: 'positive'
                    })
                    setData({
                        url: '',
                        alias: ''
                    })
                    urlRef.current.value = ''
                    aliasRef.current.value = ''
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    return (
        <div className="container">
            <h1>URL aliaser</h1>
            <form noValidate onSubmit={handleSubmitForm} action="">
                <div className="mb-3">
                    <label className="form-label" htmlFor="url">URL</label>
                    <input
                        className={`form-control ${errorMessages.url.length !== 0 ? 'is-invalid' : ''}`}
                        type="text"
                        name="url"
                        id="url"
                        onChange={handleChange}
                        onBlur={(event) => handleValidation(event.target.name, event.target.value)}
                        onFocus={handleOnFocus}
                        ref={urlRef}
                    />
                    <div className="invalid-feedback">{errorMessages.url}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="alias">Alias</label>
                    <input
                        className={`form-control ${errorMessages.alias.length !== 0 ? 'is-invalid' : ''}`}
                        type="text"
                        name="alias"
                        id="alias"
                        onChange={handleChange}
                        onBlur={(event) => { event.target.value.length === 0 ? handleValidation(event.target.name, event.target.value) : controlAliasExists(event.target.value) }}
                        onFocus={handleOnFocus}
                        ref={aliasRef}
                    />
                    <div className="invalid-feedback">{errorMessages.alias}</div>
                </div>
                <button className="btn btn-primary" type="submit" >Küldés</button>
            </form>
            { response.message.length !== 0 &&
                <div
                    className={`alert mt-3 ${response.status === 'positive' ? 'alert-success' : 'alert-danger'}`}
                    role="alert"
                >
                    {response.message}
                </div>
            }
        </div>
    );
}