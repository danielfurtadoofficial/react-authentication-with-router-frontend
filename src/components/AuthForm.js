import { Form, Link, useActionData, useNavigation, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isLoginMode = searchParams.get("mode") === "login";

  const authActionData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLoginMode ? "Log in" : "Create a new user"}</h1>
        {authActionData && authActionData.errors && (
          <ul>
            {Object.values(authActionData.errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {authActionData && authActionData.message && <p>{authActionData.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${!isLoginMode ? "login" : "signup"}`}>
            {!isLoginMode ? "Login" : "Create new user"}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
