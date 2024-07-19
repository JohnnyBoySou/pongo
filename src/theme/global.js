import styled from 'styled-components/native';
import { TouchableRipple } from 'react-native-paper';

//COMPONENTES DE LAYOUT
export const Main = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.background};
`
export const Scroll = styled.ScrollView`
  padding-top: 50px;
`
export const Row = styled.View`
  flex-direction: row;
  display: flex;
`
export const Column = styled.View`
  flex-direction: column;
  display: flex;
`


//COMPONENTES DE UTILIDADE
export const Button = styled(TouchableRipple).attrs(props => ({
  borderless: true,
  rippleColor: props.rippleColor || "#FFFFFF90",
}))`
  padding: 12px 20px;
`
export const Spacer = ({ height = 16, width = 16, }) => <Column style={{ height, width }} />



//COMPONENTES DE TEXTO
export const Label = styled.Text`
  font-size: ${props => props.size || '16px'};
  color: ${props => props.theme.color.label};
  font-family: ${props => props.theme.font.book};
  text-align: ${props => props.align || 'left'};
`;
export const SubLabel = styled.Text`
  font-size: ${props => props.size || '14px'};
  color: ${props => props.theme.color.secundary};
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
`;
export const Title = styled.Text`
  font-size: ${props => props.size || '20px'};
  color: ${props => props.theme.color.secundary};
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
`;


//FORMATACAO DE TEXTO
export const U = styled.Text`
  text-decoration: underline;
`;
export const B = styled.Text`
  font-weight: bold;
  font-family: ${props => props.theme.font.bold};
`;
