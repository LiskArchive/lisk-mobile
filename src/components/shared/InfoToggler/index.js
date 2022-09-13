import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from 'hooks/useTheme';
import InfoSvg from 'assets/svgs/InfoSvg';
import BottomModal from '../BottomModal';

import getInfoTogglerStyles from './styles';

export default function InfoToggler({ title, description, style }) {
  const [showModal, setShowModal] = useState(false);

  const { styles } = useTheme({
    styles: getInfoTogglerStyles(),
  });

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)} style={[style?.toggleButton]}>
        <InfoSvg />
      </TouchableOpacity>

      <BottomModal
        show={showModal}
        toggleShow={() => setShowModal(false)}
        style={{ container: style?.modal }}
      >
        <View style={[styles.modalContainer]}>
          {title && <Text style={[styles.title, styles.theme.title, style?.title]}>{title}</Text>}

          {description &&
            (Array.isArray(description) ? (
              description.map((descriptionItem, index) => (
                <Text
                  key={index}
                  style={[
                    styles.descriptionText,
                    styles.theme.descriptionText,
                    style?.descriptionText,
                  ]}
                >
                  {descriptionItem}
                </Text>
              ))
            ) : (
              <Text
                style={[
                  styles.descriptionText,
                  styles.theme.descriptionText,
                  style?.descriptionText,
                ]}
              >
                {description}
              </Text>
            ))}
        </View>
      </BottomModal>
    </>
  );
}
