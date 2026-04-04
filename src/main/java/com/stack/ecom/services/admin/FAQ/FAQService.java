package com.stack.ecom.services.admin.FAQ;

import com.stack.ecom.dto.FAQDto;

public interface FAQService {

    FAQDto postFAQ(Long productId, FAQDto faqDto);
}
