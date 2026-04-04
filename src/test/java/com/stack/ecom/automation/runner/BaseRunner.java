package com.stack.ecom.automation.runner;

import com.stack.ecom.automation.scenario.admin.AdminLoginScenario;
import com.stack.ecom.automation.scenario.GlobalHooks;
import org.jbehave.core.configuration.Configuration;
import org.jbehave.core.io.LoadFromClasspath;
import org.jbehave.core.junit.JUnitStory;
import org.jbehave.core.reporters.Format;
import org.jbehave.core.reporters.StoryReporterBuilder;
import org.jbehave.core.steps.InstanceStepsFactory;


public abstract class BaseRunner extends JUnitStory {

    @Override
    public Configuration configuration() {
        return new org.jbehave.core.configuration.MostUsefulConfiguration()
                .useStoryLoader(new LoadFromClasspath(getClass()))
                .useStoryReporterBuilder(
                        new StoryReporterBuilder()
                                .withDefaultFormats()
                                .withFormats(Format.CONSOLE, Format.TXT, Format.HTML)
                );
    }

    @Override
    public org.jbehave.core.steps.InjectableStepsFactory stepsFactory() {
        return new InstanceStepsFactory(configuration(),
                new AdminLoginScenario(),
                new GlobalHooks()
        );
    }
}
