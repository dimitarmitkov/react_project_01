import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
// import faker from 'faker'

import './styles.css'

/**
 * Implementation of website toasts using the Observer Pattern.
 *
 * Toasts are a way to display bits of information to the user
 * in a short notification. They are a useful tool in the feedback
 * loop for a user. It's a way to allow users to know what happened
 * in the background after thet perform an action.
 *
 * By using the Observer pattern to manage toasts, it allows us to
 * create toasts from anywhere in our app while letting our UI
 * subscribe to the toasts. This helps us keep our UI and business
 * logic separate, and allows us to instantly create toasts from anywhere.
 */
export class Toasts {
  // List of current toast subscribers
  subscribers = []

  /**
   * Adds the given function to the list of subscribers.
   *
   * Once a new toast comes in, the function will be called with
   * the new toast.
   */
  subscribe = (functionToSubscribe: never) => {
    this.subscribers.push(functionToSubscribe)
  }

  /**
   * Unsubscribes the given function from receiving updates on
   * new toasts.
   */
  unsubscribe = (functionToUnsubscribe: any) => {
    this.subscribers = this.subscribers.filter(
      (func) => func !== functionToUnsubscribe,
    )
  }

  /**
   * Lets subscribers know that a successful toast was created
   * with the given message.
   */
//   success = (message:any) => {
//     this.subscribers.forEach((subscriber) =>
//       subscriber({ type: 'success', message }),
//     )
//   }

  /**
   * Lets subscribers know that an error toast was created
   * with the given message.
   */
//   error = (message: any) => {
//     this.subscribers.forEach(subscriber =>
//       subscriber({ type: 'error', message }),
//     )
//   }

  /**
   * Lets subscribers know that a warning toast was created
   * with the given message.
   */
//   warn = (message: any) => {
//     this.subscribers.forEach((subscriber) =>
//       subscriber({ type: 'warning', message }),
//     )
//   }
}

/**
 * UI portion of our toasts. This component subscribes to the given
 * ToastObserver instance and then renders each toast it is notified
 * about for a few seconds.
 */
const Toaster = ( toastObserver: any ) => {
  // Store the currently displayed toasts locally.
  const [currentToasts, setCurrentToasts] = useState([])

  /**
   * This is the function that we will use to subscribe to
   * new toasts. When a new toast comes in it will add it to the
   * list of toasts that should be rendered, then it sets a timer
   * to automatically remove the toast after a few seconds.
   * @param {object} toast
   */
  const receiveNewToast = (toast: never) => {
    setCurrentToasts((toasts) => [...toasts, toast])

    setTimeout(() => {
      setCurrentToasts((toasts) => [
        ...toasts.slice(0, toasts.indexOf(toast)),
        ...toasts.slice(toasts.indexOf(toast) + 1),
      ])
    }, 3000)
  }

  // When the Toaster is rendered we subscribe to new toasts so we
  // can render them whenever they show up. We unsubscribe when the
  // Toaster is being destroyed because we no longer need to receive
  // updates.
  useEffect(() => {
    toastObserver.subscribe(receiveNewToast)

    return () => toastObserver.unsubscribe(receiveNewToast)
  }, [toastObserver])

  return (
    <div className="Toaster">
      {currentToasts.map(( type : any, message: any ) => (
        <div className={`Toast ${type}`} key={`${type} ${message}`}>
          {message}
        </div>
      ))}
    </div>
  )
}

const ToastObserverExample = () => {
  // We create an instance of the ToastObserver to manage the toasts
  // created throughout the "app".
  const toasts = new Toasts()

  return (
    <div className="App">
      <div className="actions">
        <button
          type="button"
          className="success"
        //   onClick={() => toasts.success(faker.hacker.phrase())}
        >
          Success Toast
        </button>

        <button
          type="button"
          className="warning"
        //   onClick={() => toasts.warn(faker.hacker.phrase())}
        >
          Warning Toast
        </button>

        <button
          type="button"
          className="error"
        //   onClick={() => toasts.error(faker.hacker.phrase())}
        >
          Error Toast
        </button>
      </div>

      <Toaster toastObserver={toasts} />
    </div>
  )
}