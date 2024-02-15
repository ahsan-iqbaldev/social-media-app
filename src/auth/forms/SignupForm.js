import React from 'react'
import { Link } from 'react-router-dom'

const SignupForm = () => {

  const handleSubmit = () =>{}

  return (
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo" />
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Create a new account
      </h2>
      <p className="text-light-3 small-medium md:base-regular">
        To use snapgram, Please enter your details
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full mt-4"
      >
        {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isCreatingAccount ? (
            <div className="flex-center gap-2">
              <Loader /> Loading...
            </div>
          ) : (
            "Sign Up"
          )}
        </Button> */}

        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?
          <Link
            to="/signin"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignupForm