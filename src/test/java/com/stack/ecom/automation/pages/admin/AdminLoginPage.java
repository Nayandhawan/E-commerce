package com.stack.ecom.automation.pages.admin;

import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class AdminLoginPage {

    WebDriver driver;

    @FindBy(id = "mat-input-0")
    WebElement usernameField;

    @FindBy(id = "mat-input-1")
    WebElement passwordField;

    @FindBy(id = "loginButton")
    WebElement loginButton;

    private static final Properties properties;

    static {
        try{
            FileInputStream fileInputStream = new FileInputStream("src/main/resources/properties/admin/adminConfig.properties");
            properties = new Properties();
            properties.load(fileInputStream);
        }
        catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException("Failed to load config.properties file");
        }
    }



    public AdminLoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void login() {
        String username = properties.getProperty("username");
        String password = properties.getProperty("password");
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        loginButton.click();
    }

    public void titleMatch(String title){
        Assertions.assertEquals(title, driver.getTitle());
    }
}
