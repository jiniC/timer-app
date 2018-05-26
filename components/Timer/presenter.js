import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Button from '../Button';

class Timer extends Component {
	// 새로운 props 불러올 때마다 실행
	componentWillReceiveProps(nextProps) {
		const currentProps = this.props;
		if(currentProps.isPlaying === false && nextProps.isPlaying === true) {
			// start the interval
			const timerInterval = setInterval(() => {
				currentProps.addSecond()
			}, 1000);
			this.setState({
				timerInterval
			})
		} else if(currentProps.isPlaying === true && nextProps.isPlaying === false) {
			// stop the interval
			clearInterval(this.state.timerInterval);
		}
		//console.log(`The current isPlaying is: ${currentProps.isPlaying} and the new isPlaying is ${nextProps.isPlaying}`);
	}
	render() {
		console.log(this.props);
        const { isPlaying, elapsedTime, timerDuration, startTimer, restartTimer, addSecond } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar barStyle={'light-content'} />
				<View style={styles.upper}>
					<Text style={styles.time}>25:00</Text>
				</View>
				<View style={styles.lower}>
                    {!isPlaying ? (
                        <Button iconName="play-circle" onPress={startTimer} />
                    ) : null}
                    {isPlaying ? (<Button iconName="stop-circle" onPress={restartTimer} />
                    ) : null}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#CE0B24',
	},
	upper: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	lower: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	time: {
		color: 'white',
		fontSize: 120,
		fontWeight: '100',
	},
});

export default Timer;
