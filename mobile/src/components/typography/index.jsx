import { StyleSheet, Text } from 'react-native';

export const Hero = (props) => {
  return <Text style={{ ...styles.hero, ...(props.style ?? {}) }}>{props.children}</Text>;
};

export const H1 = (props) => {
  return <Text style={{ ...styles.h1, ...(props.style ?? {}) }}>{props.children}</Text>;
};

export const H2 = (props) => {
  return <Text style={{ ...styles.h2, ...(props.style ?? {}) }}>{props.children}</Text>;
};

export const H3 = (props) => {
  return <Text style={{ ...styles.h3, ...(props.style ?? {}) }}>{props.children}</Text>;
};

export const BodyPrimary = (props) => {
  return <Text style={{ ...styles.body1, ...(props.style ?? {}) }}>{props.children}</Text>;
};

export const Label = (props) => {
  return <Text style={{ ...styles.label, ...(props.style ?? {}) }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  hero: {
    textAlign: 'center',
    fontSize: '48px',
    fontWeight: 700,
    color: '#D0D7E4',
  },

  h1: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#D0D7E4',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 500,
    color: '#272F3E',
  },
  h3: {
    fontSize: '18px',
    fontWeight: 400,
    color: '#D0D7E4',
  },

  body1: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#D0D7E4',
  },

  label: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#D0D7E4',
  },
});
