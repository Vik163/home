import Animated from "react-native-reanimated";

export function AnimatedText() {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          "50%": { transform: [{ rotate: "25deg" }] },
        },
        animationIterationCount: 4,
        animationDuration: "1000ms",
      }}
    >
      👋
    </Animated.Text>
  );
}
