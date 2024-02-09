package application;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.scene.Scene;
import javafx.scene.control.CheckMenuItem;
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
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class Main extends Application {

	private String noteFont;
	private String theme;
	private TextArea textArea;

	@Override
	public void start(Stage primaryStage) throws Exception {
		noteFont = getClass().getResource("/assets/normalFont.ttf").toExternalForm();
		theme = getClass().getResource("/assets/default.css").toExternalForm();

		primaryStage.setTitle("SidGautamNotes");
		BorderPane root = new BorderPane();
		root.getStyleClass().add("root-element");

		textArea = new TextArea();
		textArea.setWrapText(true);

		Menu fileMenu = new Menu("File");
		MenuItem loadItem = new MenuItem("Open");
		MenuItem saveItem = new MenuItem("Save");
		MenuItem saveAsItem = new MenuItem("Save As");
		MenuItem exitItem = new MenuItem("Exit");
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
		themeItem2.setToggleGroup(themeGroup);
		RadioMenuItem themeItem3 = new RadioMenuItem("Light");
		themeItem3.setToggleGroup(themeGroup);
		RadioMenuItem themeItem4 = new RadioMenuItem("Dark");
		themeItem4.setToggleGroup(themeGroup);
		themeItem.getItems().addAll(themeItem2, themeItem3, themeItem4);
		themeItem.getStyleClass().add("arrow-item");
		Menu zoomItem = new Menu("Zoom");
		zoomItem.getStyleClass().add("arrow-item");
		MenuItem zoomItem2 = new MenuItem();
		Slider zoom = new Slider(11, 25, 18);
		zoom.valueProperty().addListener((obs, oldValue, newValue) -> {
			setTextFont(newValue.doubleValue());

		});
		setTextFont(zoom.getValue());
		zoomItem2.setGraphic(zoom);
		zoomItem.getItems().add(zoomItem2);
		boldItem.setOnAction(event -> {
			if (boldItem.isSelected()) {
				noteFont = getClass().getResource("/assets/boldFont.ttf").toExternalForm();
				setTextFont(zoom.getValue());
			} else {
				noteFont = getClass().getResource("/assets/normalFont.ttf").toExternalForm();
				setTextFont(zoom.getValue());
			}

		});
		themeItem2.setOnAction(event -> setAppTheme());
		themeItem2.setSelected(true);
		themeItem3.setOnAction(event -> setAppTheme());
		themeItem4.setOnAction(event -> setAppTheme());
		viewMenu.getItems().add(boldItem);
		viewMenu.getItems().add(themeItem);
		viewMenu.getItems().add(zoomItem);

		MenuBar menuBar = new MenuBar();
		menuBar.getMenus().add(fileMenu);
		menuBar.getMenus().add(editMenu);
		menuBar.getMenus().add(viewMenu);

		root.setTop(menuBar);
		root.setCenter(textArea);

		Scene scene = new Scene(root, 600, 600);
		scene.getStylesheets().add(theme);
		primaryStage.getIcons().add(new Image(getClass().getResourceAsStream("/assets/icon.png")));
		primaryStage.setScene(scene);
		primaryStage.setMinWidth(450);
		primaryStage.setMinHeight(300);
		primaryStage.show();
	}

	private void setTextFont(double val) {
		textArea.setFont(Font.loadFont(noteFont, val));
	}

	private void setAppTheme() {
		return;
	}

	public static void main(String[] args) {
		try {
			launch(args);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
