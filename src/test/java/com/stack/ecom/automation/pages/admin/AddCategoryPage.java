package com.stack.ecom.automation.pages.admin;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class AddCategoryPage {

    @FindBy(xpath = "/html/body/app-root/div/mat-toolbar/button[3]/span[2]")
    WebElement categoryButton;

    @FindBy(xpath = "//input[@formcontrolname='name']")
    WebElement categoryNameField;

    @FindBy(xpath = "//input[@formcontrolname='description']")
    WebElement categoryDescriptionField;

    @FindBy(xpath = "//button[@type='submit' and contains(text(), 'Add Category')]")
    WebElement addCategoryButton;

    WebDriver driver;
    WebDriverWait wait;

    public AddCategoryPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public void clickOnCategoryButton(){
        try {
            Thread.sleep(2000); // Wait for 2 seconds before clicking
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        categoryButton.click();
    }

    public void addCategoryName(String categoryName){
        wait.until(ExpectedConditions.visibilityOf(categoryNameField)).sendKeys(categoryName);
    }

    public void addCategoryDescription(String categoryDescription){
        wait.until(ExpectedConditions.visibilityOf(categoryDescriptionField)).sendKeys(categoryDescription);
        //categoryDescriptionField.sendKeys(categoryDescription);
    }

    public void addCategoryButton(){
        try {
            Thread.sleep(2000); // Wait for 2 seconds before clicking
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        addCategoryButton.click();
    }
}
