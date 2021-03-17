import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { db } from './firebase';

export default function Delete () {
    let match = useRouteMatch()
    return (
        <Switch>
        <Route path={`${match.path}/:alias/:secretCode`}>
          <Remove />
        </Route>        
      </Switch>
    )
}

function Remove () {
    let { alias, secretCode } = useParams();
    const [response, setResponse] = useState({
        message: '',
        status: ''
    })

    useEffect(() => {
        db.collection('aliases').where('alias', '==', alias)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length > 0) {
                querySnapshot.forEach((doc) => {
                    const docId = doc.id;
                    const data = doc.data();
                    const code = data.secretCode;

                    if (code == secretCode) {
                        db.collection('aliases').doc(docId).delete()
                        .then(() => {
                            setResponse({
                                message: 'Sikeres törlés',
                                status: 'positive'
                            })
                        })
                        .catch(error => {
                            console.error(error)
                        })
                    } else {
                        handleNegativeResponse()
                    }
                })
            } else {
                handleNegativeResponse()
            }
        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    function handleNegativeResponse () {
        setResponse({
            message: 'Sikertelen törlés',
            status: 'negative'
        })
    }

    return (
        <div className="container">
            {response.message.length > 0 &&
                <div className={`alert ${response.status === 'positive' ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {response.message}
                </div>
            }
        </div>
    )
}