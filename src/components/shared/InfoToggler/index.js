import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from 'contexts/ThemeContext';
import InfoSvg from 'assets/svgs/InfoSvg';

import getInfoTogglerStyles from './styles';
import { useModal } from '../../../contexts/useModal';

export default function InfoToggler({ title, description, style }) {
  const { showModal } = useModal();

  const { styles } = useTheme({
    styles: getInfoTogglerStyles(),
  });

  const InfoItems = () => (
    <View style={[styles.modalContainer]}>
      {title && <Text style={[styles.title, styles.theme.title, style?.title]}>{title}</Text>}

      {description &&
        (Array.isArray(description) ? (
          description.map((descriptionItem, index) => (
            <Text
              key={index}
              style={[styles.descriptionText, styles.theme.descriptionText, style?.descriptionText]}
            >
              {descriptionItem}
            </Text>
          ))
        ) : (
          <Text
            style={[styles.descriptionText, styles.theme.descriptionText, style?.descriptionText]}
          >
            {description}
          </Text>
        ))}
    </View>
  );

  const openModal = () => {
    showModal(<InfoItems />);
  };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={[style?.toggleButton]}>
        <InfoSvg />
      </TouchableOpacity>
    </>
  );
}
