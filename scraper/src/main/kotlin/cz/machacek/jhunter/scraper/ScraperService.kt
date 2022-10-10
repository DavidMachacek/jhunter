package cz.machacek.jhunter.scraper

import com.gargoylesoftware.htmlunit.WebClient
import com.gargoylesoftware.htmlunit.html.HtmlElement
import com.gargoylesoftware.htmlunit.html.HtmlPage
import org.springframework.stereotype.Service

@Service
class ScraperService {


    fun scrape() {
        val client = WebClient();

        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);

        val searchUrl = "https://www.linkedin.com/in/jana-mach%C3%A1%C4%8Dkov%C3%A1-0803491b1/"
        val page = client.getPage<HtmlPage>(searchUrl)
        val items = page.getByXPath<Any?>("//*[@id=\"ember938\"]/div[2]/div[2]/div[1]/div[2]") as List<HtmlElement?>
        println("asdasd")


    }

}