import { ErrorMessage, ErrorMessageProps } from "formik";

export interface ErrorMessageInterface extends ErrorMessageProps {
  error?: string;
  withFormik?: boolean;
}

export function Error({
  error,
  className,
  withFormik = true,
  ...props
}: ErrorMessageInterface) {
  if (withFormik) {
    return (
      <ErrorMessage {...props}>
        {(error) => (
          <div
            className={`text-red-600 block ml-3.5 mt-1 text-xs ${className}`}
          >
            {error}
          </div>
        )}
      </ErrorMessage>
    );
  }

  if (!withFormik) {
    // eslint-disable-next-line
    return error ? (
      <div className={`text-red-600 block ml-3.5 mt-1 text-xs ${className}`}>
        {error}
      </div>
    ) : (
      <></>
    );
  }

  return <></>;
}
