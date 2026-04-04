package com.stack.ecom.automation.scenario;

import com.stack.ecom.automation.config.WebDriverManager;
import org.jbehave.core.annotations.AfterScenario;
import org.jbehave.core.annotations.BeforeScenario;
import org.openqa.selenium.WebDriver;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class GlobalHooks {

    private WebDriver driver;

    private static Properties properties;

    static {
        try{
            FileInputStream fileInputStream = new FileInputStream("src/main/resources/properties/config.properties");
            properties = new Properties();
            properties.load(fileInputStream);
        }
        catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException("Failed to load config.properties file");
        }
    }

    @BeforeScenario
    public void beforeScenario() {
        System.out.println("Launching browser and navigating to login page");
        driver = WebDriverManager.getDriver("chrome");
        driver.manage().window().maximize();
        String URL = properties.getProperty("URL");
        driver.get(URL);
    }

    @AfterScenario
    public void afterScenario() {
        System.out.println("Closing browser");
        WebDriverManager.quitDriver();
    }
}
