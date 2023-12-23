/* eslint-disable react/react-in-jsx-scope */
import { Text, View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

// Inside of a component's render() method:
const Course = () => (
  <ParallaxScrollView
    backgroundColor="blue"
    contentBackgroundColor="pink"
    parallaxHeaderHeight={300}
    renderForeground={() => (
      <View
        style={{
          height: 300,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Hello World!</Text>
      </View>
    )}>
    <View style={{ height: 500 }}>
      <Text>Scroll me</Text>
    </View>
  </ParallaxScrollView>
);

export default Course;
