package application;

import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.RadioMenuItem;
import javafx.scene.control.TextArea;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class MenuLogic {

	public static void saveFile(Stage stage, Main m) {
		File temp = m.getCurrentFile();
		try {
			if (!m.getCurrentFile().exists() || m.getCurrentFile() == null)
				m.saveFileChoose(stage);

			FileWriter writer = new FileWriter(m.getCurrentFile());
			writer.write(m.getTextArea().getText());
			writer.close();
		} catch (NullPointerException e) {
			m.setCurrentFile(temp);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void loadFile(Stage stage, Main m) {
		File temp = m.getCurrentFile();
		try {
			m.openFileChoose(stage);
			String content = Files.readString(Paths.get(m.getCurrentFile().getAbsolutePath()));
			m.getTextArea().setText(content);
		} catch (NullPointerException e) {
			m.setCurrentFile(temp);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void setTextFont(double val, TextArea textArea, String noteFont, Label fontSizeLbl) {
		textArea.setFont(Font.loadFont(noteFont, val));
		fontSizeLbl.setText(Math.round((val - 10.0) / 0.2) + "%");
	}

	public static void setAppTheme(ActionEvent e, Scene scene, Main m) {
		scene.getStylesheets().remove(m.getTheme());
		String cssName = ((RadioMenuItem) e.getSource()).getText();
		m.setTheme(MenuLogic.class.getResource("/assets/" + cssName.toLowerCase() + ".css").toExternalForm());
		scene.getStylesheets().add(m.getTheme());
	}

	public static void closeWindow(Stage stage, Main m) {
		saveFile(stage, m);
		Platform.exit();
	}

}