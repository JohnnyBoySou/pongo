import styled from 'styled-components/native';
import { TouchableRipple } from 'react-native-paper';

//COMPONENTES DE LAYOUT
export const Main = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.bg || props.theme.background};
`
export const Scroll = styled.ScrollView`
  padding-top: 50px;
`
export const Row = styled.View`
  flex-direction: row;
  display: flex;
  padding-vertical: ${props => props.pv || 0}px;
  padding-horizontal: ${props => props.ph || 0}px;
  margin-vertical: ${props => props.mv || 0}px;
  margin-horizontal: ${props => props.mh || 0}px;
`
export const Column = styled.View`
  flex-direction: column;
  display: flex;
  background-color: ${props => props.bg || 'transparent'};
  padding-vertical: ${props => props.pv || 0}px;
  padding-horizontal: ${props => props.ph || 0}px;
  margin-vertical: ${props => props.mv || 0}px;
  margin-horizontal: ${props => props.mh || 0}px;
`


//COMPONENTES DE UTILIDADE
export const Button =  styled(TouchableRipple).attrs(() => ({
  borderless: true, 
  rippleColor: "#FFFFFF90",
}))`
  flex-grow: 1;
  background-color: ${props => props.bg || 'transparent'};
  border-radius: ${props => props.radius || 100}px;
  padding-vertical: ${props => props.pv || 12}px;
  padding-horizontal: ${props => props.ph || 20}px;
  margin-top: ${props => props.mtop || 0}px;
  margin-bottom: ${props => props.mbottom || 0}px;
  margin-left: ${props => props.mleft || 0}px;
  margin-right: ${props => props.mright || 0}px;
`
export const Spacer = ({ height = 16, width = 16, }) => <Column style={{ height, width }} />



//COMPONENTES DE TEXTO
export const Label = styled.Text`
  font-size: ${props => props.size || '16px'};
  color: ${props => props.theme.color.label};
  font-family: ${props => props.theme.font.book};
  text-align: ${props => props.align || 'left'};
`;
export const LabelBT = styled.Text`
  font-size: ${props => props.size || '18px'};
  color: ${props => props.color || props.theme.color.label};
  font-family: ${props => props.theme.font.bold};
  letter-spacing: -0.6px;
  text-align: ${props => props.align || 'left'};
`;
export const SubLabel = styled.Text`
  font-size: ${props => props.size || '14px'};
  color: ${props => props.theme.color.sublabel};
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
`;
export const Title = styled.Text`
  font-size: ${props => props.size || '20px'};
  color: ${props => props.theme.color.title};
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
`;


//FORMATACAO DE TEXTO
export const C = styled.Text`
  color:  ${props => props.color || props.theme.color.primary};
`;
export const U = styled.Text`
  text-decoration: underline;
`;
export const B = styled.Text`
  font-weight: bold;
  font-family: ${props => props.theme.font.bold};
`;
