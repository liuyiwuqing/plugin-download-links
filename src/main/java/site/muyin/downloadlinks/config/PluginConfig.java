package site.muyin.downloadlinks.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * 插件bean配置类
 * 提供插件核心服务的Bean配置，支持插件生态扩展
 *
 * @author <a href="https://lywq.muyin.site">lywq</a>
 * @since 2024/12/11 11:30
 **/
@Configuration
public class PluginConfig {

    /**
     * ObjectMapper Bean配置
     * 提供JSON序列化和反序列化功能
     */
    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper;
    }

}