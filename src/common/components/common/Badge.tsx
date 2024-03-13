import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BadgeProps {
  label: string;
  isSelected: boolean;
  onPress?: () => void;
  emoji: string;
}

const Badge: FC<BadgeProps> = ({
  label,
  isSelected = false,
  onPress = () => {},
  emoji,
}) => {
  const badgeStyles = isSelected
    ? styles.selectedBadge
    : styles.unselectedBadge;

  const textStyles = isSelected ? styles.selectedText : styles.unselectedText;

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchArea}>
      <View style={[styles.badge, badgeStyles]}>
        <Text style={[styles.text, textStyles]}>{label}</Text>
        <Text style={[styles.text, textStyles]} className="ml-1">
          {emoji}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchArea: {
    marginHorizontal: 5,
    borderRadius: 20,
    padding: 0,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
  },
  selectedBadge: {
    backgroundColor: '#fff',
  },
  unselectedBadge: {
    backgroundColor: '#FFFFFF60',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedText: {
    color: '#273051',
  },
  unselectedText: {
    color: '#454545',
  },
});

export default Badge;
