import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'contexts/useModal';
import InfoSvg from 'assets/svgs/InfoSvg';

import getInfoTogglerStyles from './styles';

export default function InfoToggler({ title, description, style }) {
  const { showModal } = useModal();

  const { styles } = useTheme({
    styles: getInfoTogglerStyles(),
  });

  const renderInfoItem = () => (
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
    showModal(renderInfoItem());
  };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={[style?.toggleButton]}>
        <InfoSvg />
      </TouchableOpacity>
    </>
  );
}
