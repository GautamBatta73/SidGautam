package application;

import javafx.scene.input.KeyCode;
import javafx.scene.robot.Robot;

public class EditMenuLogic {

	public static void undoChange() {
		Robot robot = new Robot();
		robot.keyPress(KeyCode.CONTROL);
		robot.keyPress(KeyCode.Z);
		robot.keyRelease(KeyCode.Z);
		robot.keyRelease(KeyCode.CONTROL);
	}

	public static void redoChange() {
		Robot robot = new Robot();
		robot.keyPress(KeyCode.CONTROL);
		robot.keyPress(KeyCode.Y);
		robot.keyRelease(KeyCode.Y);
		robot.keyRelease(KeyCode.CONTROL);
	}

	public static void cutText() {
		Robot robot = new Robot();
		robot.keyPress(KeyCode.CONTROL);
		robot.keyPress(KeyCode.X);
		robot.keyRelease(KeyCode.X);
		robot.keyRelease(KeyCode.CONTROL);
	}

	public static void copyText() {
		Robot robot = new Robot();
		robot.keyPress(KeyCode.CONTROL);
		robot.keyPress(KeyCode.C);
		robot.keyRelease(KeyCode.C);
		robot.keyRelease(KeyCode.CONTROL);
	}

	public static void pasteText() {
		Robot robot = new Robot();
		robot.keyPress(KeyCode.CONTROL);
		robot.keyPress(KeyCode.V);
		robot.keyRelease(KeyCode.V);
		robot.keyRelease(KeyCode.CONTROL);
	}
}
