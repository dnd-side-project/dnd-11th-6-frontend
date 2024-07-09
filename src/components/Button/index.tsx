import styled, { css } from 'styled-components'
import { ReactNode, ReactElement } from 'react'
import theme from '@/styles/theme'

interface ButtonStyle {
  width?: string
  height?: string
  bgColor?: keyof typeof theme.colors
  hasBorder?: boolean
  borderColor?: keyof typeof theme.colors
  borderRadius?: string
  textColor?: keyof typeof theme.colors
  fontSize?: string
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyle {
  children: ReactNode
  className?: string
}

function Button({ className, children, ...rest }: ButtonProps): ReactElement {
  return (
    <ButtonStyled className={className} {...rest}>
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button<ButtonStyle>`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${({
    width = 'auto',
    height = 'auto',
    bgColor = 'white',
    hasBorder = false,
    borderColor = 'white',
    borderRadius = '4px',
    textColor = 'black',
    fontSize = '14px',
    theme,
  }) => css`
    width: ${width};
    height: ${height};
    background-color: ${theme.colors[bgColor]};
    border: ${hasBorder ? `1px solid ${theme.colors[borderColor]}` : 'none'};
    border-radius: ${borderRadius};
    color: ${theme.colors[textColor]};
    font-size: ${fontSize};
  `}
`

export default Button
