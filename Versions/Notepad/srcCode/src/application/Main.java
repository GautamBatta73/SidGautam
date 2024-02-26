package application;

import java.io.File;
import java.util.List;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.CheckMenuItem;
import javafx.scene.control.Label;
import javafx.scene.control.Menu;
import javafx.scene.control.MenuBar;
import javafx.scene.control.MenuItem;
import javafx.scene.control.RadioMenuItem;
import javafx.scene.control.SeparatorMenuItem;
import javafx.scene.control.Slider;
import javafx.scene.control.TextArea;
import javafx.scene.control.ToggleGroup;
import javafx.scene.image.Image;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.VBox;
import javafx.stage.FileChooser;
import javafx.stage.FileChooser.ExtensionFilter;
import javafx.stage.Stage;

public class Main extends Application {

	private String noteFont;
	private String theme;
	private TextArea textArea;
	private Label fontSizeLbl;
	private File currentFile;
	private FileChooser fileChoose;

	@Override
	public void start(Stage primaryStage) throws Exception {
		Platform.setImplicitExit(false);
		fileChoose = new FileChooser();
		fileChoose.getExtensionFilters().addAll(new FileChooser.ExtensionFilter("Text Files", "*.txt"),
				new ExtensionFilter("Text-Based Files", "*.*"));

		currentFile = new File("text.txt");
		noteFont = getClass().getResource("/assets/normalFont.ttf").toExternalForm();
		theme = getClass().getResource("/assets/default.css").toExternalForm();

		primaryStage.setTitle("SidGautamNotes");
		BorderPane root = new BorderPane();
		Scene scene = new Scene(root, 600, 600);
		root.getStyleClass().add("root-element");

		textArea = new TextArea();
		textArea.setWrapText(true);
		textArea.setOnKeyPressed(event -> FileMenuLogic.keyBind(event, primaryStage, this));

		Menu fileMenu = new Menu("File");
		MenuItem loadItem = new MenuItem("Open");
		MenuItem saveItem = new MenuItem("Save");
		MenuItem saveAsItem = new MenuItem("Save As");
		MenuItem exitItem = new MenuItem("Exit");
		loadItem.setOnAction(event -> {
			FileMenuLogic.confirmClose(primaryStage, this);
			FileMenuLogic.loadFile(primaryStage, this);
		});
		saveItem.setOnAction(event -> FileMenuLogic.saveFile(primaryStage, this));
		exitItem.setOnAction(event -> FileMenuLogic.closeWindow(primaryStage, this));
		saveAsItem.setOnAction(event -> {
			currentFile = new File("text.txt");
			FileMenuLogic.saveFile(primaryStage, this);
		});
		fileMenu.getItems().add(loadItem);
		fileMenu.getItems().add(saveItem);
		fileMenu.getItems().add(saveAsItem);
		fileMenu.getItems().add(exitItem);

		Menu editMenu = new Menu("Edit");
		MenuItem undoItem = new MenuItem("Undo");
		MenuItem redoItem = new MenuItem("Redo");
		MenuItem cutItem = new MenuItem("Cut");
		MenuItem copyItem = new MenuItem("Copy");
		MenuItem pasteItem = new MenuItem("Paste");
		MenuItem clearItem = new MenuItem("Clear All");
		clearItem.setOnAction(event -> {
			if (!textArea.getText().isBlank()) {
				FileMenuLogic.confirmClose(primaryStage, this);
			}
			textArea.setText("");
		});
		editMenu.getItems().add(undoItem);
		editMenu.getItems().add(redoItem);
		editMenu.getItems().add(cutItem);
		editMenu.getItems().add(copyItem);
		editMenu.getItems().add(pasteItem);
		editMenu.getItems().addAll(new SeparatorMenuItem(), clearItem);

		Menu viewMenu = new Menu("View");
		CheckMenuItem boldItem = new CheckMenuItem("Bold");
		Menu themeItem = new Menu("Theme");
		ToggleGroup themeGroup = new ToggleGroup();
		RadioMenuItem themeItem2 = new RadioMenuItem("Default");
		RadioMenuItem themeItem3 = new RadioMenuItem("Light");
		RadioMenuItem themeItem4 = new RadioMenuItem("Dark");
		Menu zoomItem = new Menu("Zoom");
		MenuItem zoomItem2 = new MenuItem();
		VBox zoomBox = new VBox();
		Slider zoom = new Slider(10, 30, 18);
		fontSizeLbl = new Label();
		themeItem2.setToggleGroup(themeGroup);
		themeItem3.setToggleGroup(themeGroup);
		themeItem4.setToggleGroup(themeGroup);
		themeItem.getItems().addAll(themeItem2, themeItem3, themeItem4);
		themeItem.getStyleClass().add("arrow-item");
		zoomItem.getStyleClass().add("arrow-item");
		zoom.valueProperty().addListener((obs, oldValue, newValue) -> {
			FileMenuLogic.setTextFont(newValue.doubleValue(), textArea, noteFont, fontSizeLbl);
		});
		FileMenuLogic.setTextFont(zoom.getValue(), textArea, noteFont, fontSizeLbl);
		zoomBox.getChildren().addAll(zoom, fontSizeLbl);
		zoomItem2.setGraphic(zoomBox);
		zoomItem.getItems().add(zoomItem2);
		boldItem.setOnAction(event -> {
			if (boldItem.isSelected()) {
				noteFont = getClass().getResource("/assets/boldFont.ttf").toExternalForm();
				FileMenuLogic.setTextFont(zoom.getValue(), textArea, noteFont, fontSizeLbl);
			} else {
				noteFont = getClass().getResource("/assets/normalFont.ttf").toExternalForm();
				FileMenuLogic.setTextFont(zoom.getValue(), textArea, noteFont, fontSizeLbl);
			}
		});
		themeItem2.setOnAction(event -> FileMenuLogic.setAppTheme(event, scene, this));
		themeItem3.setOnAction(event -> FileMenuLogic.setAppTheme(event, scene, this));
		themeItem4.setOnAction(event -> FileMenuLogic.setAppTheme(event, scene, this));
		themeItem2.setSelected(true);
		viewMenu.getItems().add(boldItem);
		viewMenu.getItems().add(themeItem);
		viewMenu.getItems().add(zoomItem);

		MenuBar menuBar = new MenuBar();
		menuBar.getMenus().add(fileMenu);
		menuBar.getMenus().add(editMenu);
		menuBar.getMenus().add(viewMenu);

		root.setTop(menuBar);
		root.setCenter(textArea);

		scene.getStylesheets().add(theme);
		primaryStage.getIcons().add(new Image(getClass().getResourceAsStream("/assets/icon.png")));
		primaryStage.setScene(scene);
		primaryStage.setMinWidth(475);
		primaryStage.setMinHeight(350);

		primaryStage.setOnCloseRequest(event -> FileMenuLogic.closeWindow(primaryStage, this));
		primaryStage.show();

		Parameters params = getParameters();
		List<String> list = params.getRaw();
		if (list != null && list.size() > 0) {
			FileMenuLogic.initializeApp(this, list.get(0));
		}
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String temp) {
		theme = temp;
	}

	public File getCurrentFile() {
		return currentFile;
	}

	public void setCurrentFile(File file) {
		currentFile = file;
	}

	public TextArea getTextArea() {
		return textArea;
	}

	public void openFileChoose(Stage stage) {
		fileChoose.setTitle("Open File");
		currentFile = fileChoose.showOpenDialog(stage);
	}

	public void saveFileChoose(Stage stage) {
		fileChoose.setTitle("Save File");
		currentFile = fileChoose.showSaveDialog(stage);
	}

	public static void showError(Main m, String header, String body) {
		Alert alert = new Alert(AlertType.ERROR);
		Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
		Label lblBody = new Label(body);
		lblBody.setWrapText(true);

		alert.setTitle("A Error Occured");
		stage.getIcons().add(new Image(Main.class.getResourceAsStream("/assets/icon.png")));
		alert.setHeaderText(header);
		alert.getDialogPane().setContent(lblBody);
		alert.getDialogPane().getStylesheets().add(m.getTheme());

		alert.showAndWait();
	}

	public static void main(String[] args) {
		try {
			launch(args);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
