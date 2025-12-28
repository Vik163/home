import { FontFamily, FontSizes, FontWeights } from "@/shared/constants/fonts";
import { useStyles } from "@/shared/hooks/useStyles";
import { Theme } from "@/shared/types/theme";
import { Button, Font } from "@/shared/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";

interface ModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  onSubmit?: () => void;
  title: string;
  width: number;
  height?: number;
  children: ReactNode;
}

const ModalUI = (props: ModalProps) => {
  const { modalVisible, closeModal, title, onSubmit, children } = props;
  const { styles, theme } = useStyles(createStyles(props));
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => closeModal()}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Font
            family={FontFamily.SOFIA}
            size={FontSizes.MEDIUM}
            weight={FontWeights.BOLD}
          >
            {title}
          </Font>
          <Ionicons
            style={styles.close}
            name="close"
            size={38}
            color={theme.colors.border}
            onPress={() => closeModal()}
          />
          {children}
          {onSubmit && (
            <Button
              stylesBtn={styles.submit}
              fontSize={15}
              title={"Подтвердить"}
              onPress={() => onSubmit()}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (props: ModalProps) => (theme: Theme) => {
  const { width, height } = props;
  return StyleSheet.create({
    centeredView: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width,
      height,
      backgroundColor: theme.colors.bgModal,
      borderRadius: 10,
      borderColor: theme.colors.border,
      borderWidth: 1,
      padding: 15,
      alignItems: "center",
      gap: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: "relative",
    },
    close: {
      position: "absolute",
      top: 7,
      right: 7,
      width: 40,
      height: 38,
    },
    submit: {
      width: "100%",
      height: 35,
      borderColor: theme.colors.border,
      borderRadius: 6,
      borderWidth: 1,
    },
  });
};

export default ModalUI;
