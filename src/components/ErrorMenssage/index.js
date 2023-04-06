import React from 'react'

import PropTypes from 'prop-types'

import * as C from './style'

export function ErrorMenssage({ children }) {
  return <C.ErrorMessageStyle>{children}</C.ErrorMessageStyle>
}

ErrorMenssage.propTypes = {
  children: PropTypes.string
}
