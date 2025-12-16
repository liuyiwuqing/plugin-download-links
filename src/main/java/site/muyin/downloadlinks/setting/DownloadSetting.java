package site.muyin.downloadlinks.setting;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

/**
 * 下载配置
 *
 * @author <a href="https://lywq.muyin.site">lywq</a>
 * @since 2025/11/4 22:53
 **/
@Data
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DownloadSetting {
    public static final String GROUP = "basic";
    private Map slots;

    private String lightModeSelector;

    private String darkModeSelector;

    private List<DownloadSource> downloadSourceList;

    @Data
    @Accessors(chain = true)
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DownloadSource {
        /**
         * 名称
         */
        private String name;
        /**
         * 图标
         */
        private String icon;
    }
}
