package com.stack.ecom.automation.pages.customer;

import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class CustomerLoginPage {

    WebDriver driver;

    @FindBy(css = "input[formcontrolname='email']")
    WebElement usernameField;

    @FindBy(css = "input[formcontrolname='password']")
    WebElement passwordField;

    @FindBy(id = "loginButton")
    WebElement loginButton;

    private static final Properties properties;

    static {
        try{
            FileInputStream fileInputStream = new FileInputStream("src/main/resources/properties/customer/customerConfig.properties");
            properties = new Properties();
            properties.load(fileInputStream);
        }
        catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException("Failed to load config.properties file");
        }
    }



    public CustomerLoginPage(WebDriver driver) {
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

    public void verifyLogingin(String username, String password) {
        try {
            usernameField.sendKeys(username);
            passwordField.sendKeys(password);
            Thread.sleep(3000); // Wait for 2 seconds before clicking
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        loginButton.click();
    }

    public void titleMatch(String title){
        Assertions.assertEquals(title, driver.getTitle());
    }
}
