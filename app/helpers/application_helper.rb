# encoding: utf-8
module ApplicationHelper
  def whois(user)
    current_user[:id] == user[:id] ? '我' : user[:nick]
  end

  def dare id
    user = User.find id
    user.nick
  end

  def showsex sex
    case sex
    when '男' then '男生'
    when '女' then '女生'
    else 'TA'
    end
  end

  def decade date
    date.year.to_s[2]+'0'
  end

  def astro date
    month = date.month
    day = date.day
    astro_list = ['魔羯座','水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','魔羯座']
    last_day_list = [20,19,20,20,21,21,22,23,23,23,22,21]
    astro_list[month-(day<=last_day_list[month-1]?1:0)]
  end

  def status_time_ago_in_words(time)
    time_word = time_ago_in_words(time)
    case time_word
    when "less than a minute"
      "刚刚"
    when /minute/
      time_word.gsub(/minutes|minute/,'分钟') + "前"
    when /hour/
      ##time.gsub(/about/,'').gsub(/hours/,'小时') + "前"
      time_word.gsub(/about (\d+) (hours|hour)/, '\1小时') + "前"
    when "1 day"
      "昨天"
    when "2 days"
      "前天"
    when "3 days"
      "3天前"
    else
      time.strftime("%Y年%m月%d日")
    end
  end

  def avatar user,o
    user.avatars.blank? ? 'noavatar.gif' : user.avatars.last.avatar.url(o)
  end
end
