import React, { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css"
import NotificationContext from "../../store/NotificationContext";

function NewsletterRegistration() {
  const emailRef = useRef();
  const { showNotification } = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;

    /*
    TODO: Notification
    MARK: - Notification
    */
    showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email:enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    // .then(res => res.json())
    // .then(data => console.log(data))
    
    .then((res) => {
        if (res.ok) {
          console.log(enteredEmail);
          return res.json()
        }
        return res.json().then((data) => {
          // data是从‘api/newsletter‘取回的相应体 ‘Signed up‘
          console.log(`So,i can't get this data normal,right? :${data}`);
          throw new Error(data.message || "Something went wring")
        });
      })
      .then(() => {
        showNotification({
          title: "Success!",
          message: "Succussfully registered for newsletter",
          status: "success",
        });
      })
      .catch((err) =>
        showNotification({
          title: "Error!",
          message: err.message || "Something went wrong!",
          status: "error",
        })
      )
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to recive news form Next Events</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
