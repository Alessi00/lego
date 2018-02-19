// @flow

import React, { type ComponentType } from 'react';
import cx from 'classnames';
import Icon from 'app/components/Icon';
import { Flex } from 'app/components/Layout';
import Tooltip from 'app/components/Tooltip';
import styles from './Field.css';

const FieldError = ({ error }: { error?: string }) =>
  error ? <div className={styles.fieldError}>{error}</div> : null;

export const RenderErrorMessage = ({
  error
}: {
  error: Array<string> | string
}) => {
  if (Array.isArray(error)) {
    return error.map(error => <RenderErrorMessage key={error} error={error} />);
  }

  return <FieldError error={error} key={error} />;
};

export type FieldProps = {
  className: string,
  input: Object,
  meta: Object,
  required: boolean,
  label: string,
  description?: string,
  fieldStyle: any,
  fieldClassName: string,
  labelClassName: string,
  showErrors: boolean
};

/**
 * Wraps Component so it works with redux-form and add some default
 * field behaviour.
 *
 * http://redux-form.com/6.0.5/docs/api/Field.md/
 */
export function createField(Component: ComponentType<*>) {
  const Field = (field: FieldProps) => {
    const {
      input,
      meta,
      required,
      label,
      fieldStyle,
      description,
      fieldClassName,
      labelClassName,
      showErrors = true,
      className = null,
      ...props
    } = field;
    const { error, touched } = meta;
    const hasError = showErrors && touched && error && error.length > 0;
    return (
      <div className={cx(styles.field, fieldClassName)} style={fieldStyle}>
        <label className={cx(styles.label, labelClassName)}>
          <Flex>
            {label && <div>{label}</div>}
            {description && (
              <Tooltip
                style={{ display: 'inline-block' }}
                content={description}
              >
                <div style={{ marginLeft: '10px' }}>
                  <Icon size={32} name="help" />
                </div>
              </Tooltip>
            )}
            {required && <span className={styles.required}>*</span>}
          </Flex>
          <Component
            {...input}
            {...props}
            className={cx(className, hasError && styles.inputWithError)}
          />
        </label>
        {hasError && <RenderErrorMessage error={meta.error} />}
      </div>
    );
  };

  Field.displayName = `Field(${
    Component ? Component.displayName || Component.name : 'Unknown'
  })`;
  return Field;
}
