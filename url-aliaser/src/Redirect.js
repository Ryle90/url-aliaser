import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { db } from './firebase';

export default function Redirect () {
    let match = useRouteMatch()
    return (
        <Switch>
        <Route path={`${match.path}/:alias`}>
          <Alias />
        </Route>        
      </Switch>
    )
}

function Alias() {
    let { alias } = useParams();

    const [response, setResponse] = useState({
        message: '',
        status: ''
    })

    useEffect(() => {
        console.log(alias)
        db.collection('aliases').where('alias', '==', alias)
            .get()
            .then((querySnapshot) => {
                if(querySnapshot.docs.length > 0) {
                    querySnapshot.forEach((doc) => {
                        const docId = doc.id;
                        const data = doc.data();
                        const url = data.url;
                        const hitCount = data.hitCount + 1;

                        db.collection('aliases').doc(docId).set({
                            ...data,
                            hitCount: hitCount
                        })
                        .catch(error => {
                            console.error(error)
                        })

                        setResponse({
                            message: `Az átirányítás megtörténik 5 másodpercen belül ide: ${url}`,
                            status: 'positive'
                        })

                        setTimeout(() => {
                            window.location.href = url
                        }, 5000)
                    });
                } else {
                    setResponse({
                        message: 'Az alias nem található',
                        status: 'negative'
                    })
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [])


    return (
        <div className="container">
            {response.message.length > 0 && 
                <div class={`alert ${response.status === 'positive' ? 'alert-info' : 'alert-danger'}`} role="alert">
                {response.message}
              </div>
            }
        </div>
    );
}