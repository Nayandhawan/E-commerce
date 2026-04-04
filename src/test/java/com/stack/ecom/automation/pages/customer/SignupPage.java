package com.stack.ecom.automation.pages.customer;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class SignupPage {

    private final WebDriver driver;

    public SignupPage(WebDriver driver) {
        this.driver = driver;
    }
    // Signup form fields (these are found via formControlName)
    private final By nameField = By.cssSelector("input[formcontrolname='name']");
    private final By emailField = By.cssSelector("input[formcontrolname='email']");
    private final By passwordField = By.cssSelector("input[formcontrolname='password']");
    private final By confirmPasswordField = By.cssSelector("input[formcontrolname='confirmPassword']");


    // Signup submit button
    private final By signupButton = By.xpath("/html/body/app-root/app-signup/div/mat-card/mat-card-content[1]/form/button/span[2]");

    public void enterName(String name) {
        driver.findElement(nameField).clear();
        driver.findElement(nameField).sendKeys(name);
    }

    public void enterEmail(String email) {
        driver.findElement(emailField).clear();
        driver.findElement(emailField).sendKeys(email);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordField).clear();
        driver.findElement(passwordField).sendKeys(password);
    }

    public void enterConfirmPassword(String confirmPassword) {
        driver.findElement(confirmPasswordField).clear();
        driver.findElement(confirmPasswordField).sendKeys(confirmPassword);
    }

    public void clickSignupButton() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement signupBtn = wait.until(ExpectedConditions.elementToBeClickable(signupButton));
        signupBtn.click();
    }
}
