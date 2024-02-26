package application;

import java.io.File;
import java.io.FileWriter;
import java.nio.charset.CharacterCodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.RadioMenuItem;
import javafx.scene.control.TextArea;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.ButtonType;
import javafx.scene.image.Image;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyCodeCombination;
import javafx.scene.input.KeyCombination;
import javafx.scene.input.KeyEvent;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class FileMenuLogic {

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
		} catch (CharacterCodingException e) {
			Main.showError(m, "File in Incompatible",
					"The file that you tried to open\n" + "may be corrupted or incompatible.");
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
		m.setTheme(FileMenuLogic.class.getResource("/assets/" + cssName.toLowerCase() + ".css").toExternalForm());
		scene.getStylesheets().add(m.getTheme());
	}

	public static void initializeApp(Main m, String file) {
		File temp = m.getCurrentFile();
		File openFile = new File(file);
		try {
			if (openFile.exists() && openFile != null) {
				String content = Files.readString(Paths.get(openFile.getAbsolutePath()));
				m.getTextArea().setText(content);
				m.setCurrentFile(openFile);
			}
		} catch (NullPointerException e) {
			m.setCurrentFile(temp);
		} catch (CharacterCodingException e) {
			Main.showError(m, "File in Incompatible",
					"The file that you tried to open\n" + "may be corrupted or incompatible.");
			m.setCurrentFile(temp);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void closeWindow(Stage stage, Main m) {
		confirmClose(stage, m);
		Platform.exit();
	}

	public static void confirmClose(Stage stage, Main m) {
		try {
			File file = m.getCurrentFile();
			String fileContent = "";

			if (((!file.exists() || file == null) ^ m.getTextArea().getText().isBlank())
					|| ((file.exists() || file != null) && !m.getTextArea().getText().isBlank())) {

				if (file.exists() && file != null) {
					fileContent = Files.readString(Paths.get(file.getAbsolutePath()));
				}

				if (!fileContent.equals(m.getTextArea().getText()) || (!file.exists() || file == null)) {
					Alert alert = new Alert(AlertType.CONFIRMATION);
					Stage alrtStage = (Stage) alert.getDialogPane().getScene().getWindow();
					Label body = new Label("There are unsaved changes in your file.\n" + "Do you want save them?");
					body.setWrapText(true);

					alert.setTitle("Unsaved Changes");
					alrtStage.getIcons().add(new Image(FileMenuLogic.class.getResourceAsStream("/assets/icon.png")));
					alert.setHeaderText("Do You Wanna Save");
					alert.getDialogPane().setContent(body);
					alert.getDialogPane().getStylesheets().add(m.getTheme());

					Optional<ButtonType> result = alert.showAndWait();
					if (result.get() == ButtonType.OK) {
						saveFile(stage, m);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void keyBind(KeyEvent e, Stage stage, Main m) {
		KeyCombination saveCombo = new KeyCodeCombination(KeyCode.S, KeyCombination.CONTROL_DOWN);
		KeyCombination openCombo = new KeyCodeCombination(KeyCode.O, KeyCombination.CONTROL_DOWN);
		KeyCombination saveAsCombo = new KeyCodeCombination(KeyCode.S, KeyCombination.CONTROL_DOWN,
				KeyCombination.SHIFT_DOWN);

		if (saveCombo.match(e)) {
			saveFile(stage, m);
		} else if (openCombo.match(e)) {
			FileMenuLogic.confirmClose(stage, m);
			FileMenuLogic.loadFile(stage, m);
		} else if (saveAsCombo.match(e)) {
			m.setCurrentFile(new File("text.txt"));
			saveFile(stage, m);
		}
		e.consume();
	}

}