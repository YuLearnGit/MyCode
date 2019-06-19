import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * 创建者:
 * 日期: 2019/5/10 10:34
 * 描述:
 */
public class Mytest {
    public static void main(String[] args) {
       GregorianCalendar date = new GregorianCalendar();
       int year = date.get(Calendar.YEAR);
       System.out.println(year);
       Date today = new Date();
       System.out.println(today);
    }
}

