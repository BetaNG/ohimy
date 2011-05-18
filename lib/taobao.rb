module Taobao

  @fields ={
    'taobao.users.get' => 'user_id,uid,nick,sex,buyer_credit,seller_credit,location,created,last_visit,birthday,type,status,alipay_no,alipay_account,alipay_account,email,consumer_protection,alipay_bind',
    'taobao.item.get' => 'detail_url,num_iid,title,nick,cid,props,pic_url,location,price,product_id,item_img,prop_img',
    'taobao.taobaoke.items.get' => 'num_iid,title,nick,pic_url,price,click_url,commission,commission_rate,commission_num,commission_volume,shop_click_url,seller_credit_score,item_location,volume',
    'taobao.taobaoke.items.convert' => 'click_url,num_iid,commission,commission_rate,commission_num,commission_volume,pic_url,price,shop_click_url,seller_credit_score,title,nick',
    'taobao.taobaoke.items.detail.get' =>'click_url,num_iid,commission,commission_rate,commission_num,commission_volume,pic_url,price,shop_click_url,seller_credit_score,title,nick,type,skus,desc,list_time,delist_time,modified,auction_point',
    'taobao.shop.get' => 'sid,cid,title,nick,pic_path,created,modified',
    'taobao.taobaoke.shops.convert' => 'user_id,shop_title,click_url,commission_rate'
  }.freeze
    
  class<<self
    
    # => 获取多个用户信息   taobao.users.get
    # => 可以获取单个用户
    # => 可传参数 nicks 多个用,隔开
    def users_get(pra = {})
      pra.reverse_merge!('method' =>'taobao.users.get','fields'=>@fields['taobao.users.get'])
      re = OpenTaobao.post_with(pra)
      re['users_get_response']['users']['user']
    end

    # => 得到单个商品信息  taobao.item.get
    # => 获取单个商品的详细信息 卖家未登录时只能获得这个商品的公开数据，卖家登录后可以获取商品的所有数据
    # => 传入参数为商品num_iid
    def item_get(pra = {})
      pra.reverse_merge!('method' =>'taobao.item.get','fields'=>@fields['taobao.item.get'])
      re = OpenTaobao.post_with(pra)
      re['item_get_response']['item']
    end
    
    # => 查询淘宝客推广商品
    # => 注意nick和pid至少需要传递一个,如果2个都传了,将以pid为准
    # => 用于提供本站 站内搜索功能(搜索淘宝客推广商品)
    def taobaoke_items_get(pra={})
      pra.reverse_merge!('method' =>'taobao.taobaoke.items.get','fields'=>@fields['taobao.taobaoke.items.get'],'nick'=>'hello_tony')
      re = OpenTaobao::post_with(pra)
      re['taobaoke_items_get_response']['taobaoke_items']['taobaoke_item']
    end

    # => 根据url获取num_iid,在得到商品详细信息
    # => 传入num_iid
    def taobaoke_items_convert(pra={})
      pra.reverse_merge!('method' =>'taobao.taobaoke.items.convert','fields'=>@fields['taobao.taobaoke.items.convert'],'nick'=>'hello_tony')
      re = OpenTaobao.post_with(pra)
      re['taobaoke_items_convert_response'].empty? ? nil : re['taobaoke_items_convert_response']['taobaoke_items']['taobaoke_item'][0]
    end

    # => 查询淘宝客推广商品详细信息
    # => num_iids 淘宝客商品数字id串.最大输入10个.格式如:"value1,value2,value3" 用" , "号分隔商品id.
    # => nick 淘宝用户昵称
    def taobaoke_items_detail_get(pra={})
      pra.reverse_merge!('method' =>'taobao.taobaoke.items.detail.get','fields'=>@fields['taobao.taobaoke.items.detail.get'],'nick'=>'hello_tony')
      re = OpenTaobao.post_with(pra)
      re['taobaoke_items_detail_get_response'].empty? ? nil : re['taobaoke_items_detail_get_response']['taobaoke_item_details']['taobaoke_item_detail']
    end

    # => 获取卖家店铺的基本信息
    def shop_get(pra={})
      pra.reverse_merge('method' =>'taobao.shop.get','fields'=>@fields['taobao.shop.get'])
      re = OpenTaobao.post_with(pra)
      re['shop_get_response'].empty? ? nil : re['shop_get_response']['shop']
    end

    # => taobao.taobaoke.shops.convert 淘客店铺转换
    def taobaoke_shops_convert(pra={})
      pra.reverse_merge!('method' =>'taobao.taobaoke.shops.convert','fields'=>@fields['taobao.taobaoke.shops.convert'],'nick'=>'hello_tony')
      re = OpenTaobao.post_with(pra)
      re['taobaoke_shops_convert_response'].empty? ? nil : re['taobaoke_shops_convert_response']['taobaoke_shops']['taobaoke_shop'][0]
    end

    # => 获取后台供卖家发布商品的标准商品类目
    # => 用于同步淘宝产品目录到本站，然后逐个目录生成站内目录页
    def itemcats_get(pra={})
      pra.reverse_merge!('method' =>'taobao.itemcats.get','fields'=>'cid,parent_cid,name,is_parent','datetime'=>Time.now.strftime("%Y-%m-%d %H:%M:%S"))
      re = OpenTaobao.post_with(pra)
      re['itemcats_get_response']['item_cats']['item_cat']
    end
    
    # => 搜索产品信息 taobao.products.search
    # => 可传参数 q=关键字  cids=商品类目ID  props=属性值
    def products_search(pra={})
      pra.reverse_merge!('method' =>'taobao.products.search','fields'=>'product_id,cid,props,name,pic_url')
      re = OpenTaobao.post_with(pra)
      if re['products_search_response']['total_results'] ==0
        []
      else
        re['products_search_response']['products']['product']
      end
    end
  end
end
