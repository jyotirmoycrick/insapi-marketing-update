"""
Enhanced Page Builder Database Schema
Hierarchical structure: Page → Sections → Containers → Widgets
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from datetime import datetime

# ============================================
# WIDGET MODELS
# ============================================

class WidgetStyles(BaseModel):
    """Widget styling properties"""
    # Typography
    fontSize: Optional[str] = None
    fontWeight: Optional[str] = None
    fontFamily: Optional[str] = None
    lineHeight: Optional[str] = None
    letterSpacing: Optional[str] = None
    textAlign: Optional[str] = None
    textTransform: Optional[str] = None
    textDecoration: Optional[str] = None
    
    # Colors
    color: Optional[str] = None
    backgroundColor: Optional[str] = None
    gradientBackground: Optional[str] = None
    
    # Spacing
    padding: Optional[str] = None
    paddingTop: Optional[str] = None
    paddingRight: Optional[str] = None
    paddingBottom: Optional[str] = None
    paddingLeft: Optional[str] = None
    margin: Optional[str] = None
    marginTop: Optional[str] = None
    marginRight: Optional[str] = None
    marginBottom: Optional[str] = None
    marginLeft: Optional[str] = None
    
    # Border
    border: Optional[str] = None
    borderWidth: Optional[str] = None
    borderStyle: Optional[str] = None
    borderColor: Optional[str] = None
    borderRadius: Optional[str] = None
    
    # Effects
    boxShadow: Optional[str] = None
    opacity: Optional[str] = None
    transform: Optional[str] = None
    transition: Optional[str] = None
    
    # Layout
    width: Optional[str] = None
    maxWidth: Optional[str] = None
    minWidth: Optional[str] = None
    height: Optional[str] = None
    maxHeight: Optional[str] = None
    minHeight: Optional[str] = None
    display: Optional[str] = None
    position: Optional[str] = None
    zIndex: Optional[int] = None
    
    # Responsive (device-specific overrides)
    tablet: Optional[Dict[str, Any]] = None
    mobile: Optional[Dict[str, Any]] = None
    
    # Animation
    animation: Optional[str] = None
    animationDuration: Optional[str] = None
    animationDelay: Optional[str] = None
    
    # Hover effects
    hover: Optional[Dict[str, Any]] = None


class Widget(BaseModel):
    """Individual widget/element"""
    id: str
    type: str  # heading, text, image, button, etc.
    content: Dict[str, Any] = Field(default_factory=dict)
    styles: WidgetStyles = Field(default_factory=WidgetStyles)
    settings: Dict[str, Any] = Field(default_factory=dict)
    order: int = 0
    visibility: Dict[str, bool] = Field(default_factory=lambda: {
        "desktop": True, "tablet": True, "mobile": True
    })


# ============================================
# CONTAINER MODELS
# ============================================

class Container(BaseModel):
    """Container/Column inside a section"""
    id: str
    type: str = "column"  # column, grid, flex
    width: str = "100%"  # 100%, 50%, 33.33%, 25%, etc.
    widgets: List[Widget] = Field(default_factory=list)
    styles: WidgetStyles = Field(default_factory=WidgetStyles)
    settings: Dict[str, Any] = Field(default_factory=dict)
    order: int = 0


# ============================================
# SECTION MODELS
# ============================================

class ShapeDivider(BaseModel):
    """Shape divider for section top/bottom"""
    enabled: bool = False
    type: str = "wave"  # wave, curve, tilt, triangle, blob
    color: str = "#ffffff"
    height: str = "100px"
    flip: bool = False


class SectionBackground(BaseModel):
    """Section background options"""
    type: str = "color"  # color, gradient, image, video
    color: Optional[str] = "#ffffff"
    gradient: Optional[str] = None
    image: Optional[str] = None
    videoUrl: Optional[str] = None
    overlay: Optional[str] = None
    overlayOpacity: float = 0.5
    attachment: str = "scroll"  # scroll, fixed (parallax)
    position: str = "center center"
    size: str = "cover"  # cover, contain, auto


class Section(BaseModel):
    """Page section"""
    id: str
    name: str = "Section"
    layout: str = "full"  # full, boxed
    contentWidth: str = "1200px"
    containers: List[Container] = Field(default_factory=list)
    background: SectionBackground = Field(default_factory=SectionBackground)
    shapeDividerTop: ShapeDivider = Field(default_factory=ShapeDivider)
    shapeDividerBottom: ShapeDivider = Field(default_factory=ShapeDivider)
    styles: WidgetStyles = Field(default_factory=WidgetStyles)
    settings: Dict[str, Any] = Field(default_factory=dict)
    order: int = 0
    visibility: Dict[str, bool] = Field(default_factory=lambda: {
        "desktop": True, "tablet": True, "mobile": True
    })


# ============================================
# PAGE MODEL
# ============================================

class PageMeta(BaseModel):
    """SEO and page metadata"""
    title: str = ""
    description: str = ""
    keywords: List[str] = Field(default_factory=list)
    ogImage: Optional[str] = None
    canonical: Optional[str] = None
    noindex: bool = False
    nofollow: bool = False


class PageBuilder(BaseModel):
    """Complete page structure"""
    page_id: str
    page_name: str
    route: str
    sections: List[Section] = Field(default_factory=list)
    meta: PageMeta = Field(default_factory=PageMeta)
    is_published: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    version: int = 1


# ============================================
# WIDGET TYPE DEFINITIONS
# ============================================

WIDGET_TYPES = {
    # Basic widgets
    "heading": {
        "name": "Heading",
        "icon": "Heading",
        "category": "basic",
        "defaultContent": {
            "text": "Your Heading Text",
            "tag": "h2",
            "link": None
        },
        "defaultStyles": {
            "fontSize": "32px",
            "fontWeight": "bold",
            "color": "#000000",
            "textAlign": "left"
        }
    },
    "text": {
        "name": "Text Editor",
        "icon": "Type",
        "category": "basic",
        "defaultContent": {
            "html": "<p>Your text content goes here...</p>"
        },
        "defaultStyles": {
            "fontSize": "16px",
            "color": "#333333",
            "lineHeight": "1.6"
        }
    },
    "image": {
        "name": "Image",
        "icon": "Image",
        "category": "basic",
        "defaultContent": {
            "src": "",
            "alt": "Image",
            "link": None,
            "lightbox": False
        },
        "defaultStyles": {
            "width": "100%",
            "borderRadius": "0px"
        }
    },
    "button": {
        "name": "Button",
        "icon": "MousePointer",
        "category": "basic",
        "defaultContent": {
            "text": "Click Here",
            "link": "#",
            "icon": None,
            "iconPosition": "left"
        },
        "defaultStyles": {
            "backgroundColor": "#007bff",
            "color": "#ffffff",
            "padding": "12px 24px",
            "borderRadius": "4px",
            "fontSize": "16px",
            "fontWeight": "500"
        }
    },
    "icon": {
        "name": "Icon",
        "icon": "Star",
        "category": "basic",
        "defaultContent": {
            "icon": "star",
            "link": None
        },
        "defaultStyles": {
            "fontSize": "48px",
            "color": "#007bff"
        }
    },
    "icon-box": {
        "name": "Icon Box",
        "icon": "Square",
        "category": "basic",
        "defaultContent": {
            "icon": "star",
            "title": "Feature Title",
            "description": "Feature description goes here",
            "link": None
        },
        "defaultStyles": {
            "textAlign": "center",
            "padding": "30px"
        }
    },
    "divider": {
        "name": "Divider",
        "icon": "Minus",
        "category": "basic",
        "defaultContent": {
            "style": "solid",
            "weight": "1px"
        },
        "defaultStyles": {
            "borderTop": "1px solid #ddd",
            "margin": "20px 0"
        }
    },
    "spacer": {
        "name": "Spacer",
        "icon": "MoveVertical",
        "category": "basic",
        "defaultContent": {
            "height": "50px"
        },
        "defaultStyles": {
            "height": "50px"
        }
    },
    
    # Layout widgets
    "container": {
        "name": "Container",
        "icon": "Square",
        "category": "layout",
        "defaultContent": {},
        "defaultStyles": {
            "padding": "20px"
        }
    },
    "grid": {
        "name": "Grid",
        "icon": "Grid",
        "category": "layout",
        "defaultContent": {
            "columns": 3,
            "gap": "20px"
        },
        "defaultStyles": {
            "display": "grid"
        }
    },
    "flex": {
        "name": "Flex Layout",
        "icon": "Columns",
        "category": "layout",
        "defaultContent": {
            "direction": "row",
            "justify": "flex-start",
            "align": "stretch",
            "gap": "20px"
        },
        "defaultStyles": {
            "display": "flex"
        }
    },
    
    # Advanced widgets
    "carousel": {
        "name": "Carousel",
        "icon": "Image",
        "category": "advanced",
        "defaultContent": {
            "slides": [],
            "autoplay": True,
            "interval": 5000,
            "showDots": True,
            "showArrows": True
        }
    },
    "testimonial": {
        "name": "Testimonial",
        "icon": "Quote",
        "category": "advanced",
        "defaultContent": {
            "quote": "This is an amazing service!",
            "author": "John Doe",
            "position": "CEO, Company",
            "avatar": "",
            "rating": 5
        }
    },
    "accordion": {
        "name": "Accordion",
        "icon": "ChevronDown",
        "category": "advanced",
        "defaultContent": {
            "items": [
                {"title": "Question 1", "content": "Answer 1", "open": False}
            ]
        }
    },
    "tabs": {
        "name": "Tabs",
        "icon": "Layers",
        "category": "advanced",
        "defaultContent": {
            "tabs": [
                {"title": "Tab 1", "content": "Content 1"}
            ]
        }
    },
    "counter": {
        "name": "Counter",
        "icon": "Hash",
        "category": "advanced",
        "defaultContent": {
            "endValue": 100,
            "duration": 2000,
            "prefix": "",
            "suffix": "+",
            "label": "Happy Clients"
        }
    },
    "progress-bar": {
        "name": "Progress Bar",
        "icon": "BarChart2",
        "category": "advanced",
        "defaultContent": {
            "percentage": 75,
            "label": "Skill Name",
            "showPercentage": True
        }
    },
    "pricing-table": {
        "name": "Pricing Table",
        "icon": "DollarSign",
        "category": "advanced",
        "defaultContent": {
            "title": "Basic Plan",
            "price": "$29",
            "period": "/month",
            "features": ["Feature 1", "Feature 2", "Feature 3"],
            "buttonText": "Get Started",
            "buttonLink": "#",
            "featured": False
        }
    },
    "team-member": {
        "name": "Team Member",
        "icon": "User",
        "category": "advanced",
        "defaultContent": {
            "name": "John Doe",
            "position": "CEO & Founder",
            "bio": "Short bio text",
            "avatar": "",
            "social": {
                "facebook": "",
                "twitter": "",
                "linkedin": "",
                "instagram": ""
            }
        }
    },
    "video": {
        "name": "Video",
        "icon": "PlayCircle",
        "category": "advanced",
        "defaultContent": {
            "url": "",
            "provider": "youtube",  # youtube, vimeo, self-hosted
            "autoplay": False,
            "muted": False,
            "controls": True
        }
    },
    "image-gallery": {
        "name": "Image Gallery",
        "icon": "Images",
        "category": "advanced",
        "defaultContent": {
            "images": [],
            "columns": 3,
            "gap": "10px",
            "lightbox": True
        }
    },
    "before-after": {
        "name": "Before/After",
        "icon": "GitCompare",
        "category": "advanced",
        "defaultContent": {
            "beforeImage": "",
            "afterImage": "",
            "label": True
        }
    },
    "marquee": {
        "name": "Marquee",
        "icon": "Move",
        "category": "advanced",
        "defaultContent": {
            "text": "Scrolling text goes here",
            "speed": "50",
            "direction": "left",
            "pauseOnHover": True
        }
    },
    
    # Marketing widgets
    "contact-form": {
        "name": "Contact Form",
        "icon": "Mail",
        "category": "marketing",
        "defaultContent": {
            "fields": [
                {"type": "text", "name": "name", "label": "Name", "required": True},
                {"type": "email", "name": "email", "label": "Email", "required": True},
                {"type": "textarea", "name": "message", "label": "Message", "required": True}
            ],
            "buttonText": "Send Message",
            "successMessage": "Thank you! We'll be in touch soon."
        }
    },
    "cta-banner": {
        "name": "CTA Banner",
        "icon": "Megaphone",
        "category": "marketing",
        "defaultContent": {
            "title": "Ready to Get Started?",
            "description": "Join thousands of satisfied customers today",
            "buttonText": "Get Started Now",
            "buttonLink": "#",
            "backgroundImage": ""
        }
    },
    "feature-list": {
        "name": "Feature List",
        "icon": "CheckCircle",
        "category": "marketing",
        "defaultContent": {
            "items": [
                {"icon": "check", "text": "Feature 1"},
                {"icon": "check", "text": "Feature 2"},
                {"icon": "check", "text": "Feature 3"}
            ]
        }
    },
    "service-card": {
        "name": "Service Card",
        "icon": "Briefcase",
        "category": "marketing",
        "defaultContent": {
            "icon": "briefcase",
            "title": "Service Name",
            "description": "Service description goes here",
            "link": "#",
            "linkText": "Learn More"
        }
    },
    "stats-section": {
        "name": "Stats Section",
        "icon": "TrendingUp",
        "category": "marketing",
        "defaultContent": {
            "stats": [
                {"number": "100", "suffix": "+", "label": "Clients"},
                {"number": "500", "suffix": "+", "label": "Projects"},
                {"number": "50", "suffix": "+", "label": "Awards"}
            ]
        }
    }
}


# ============================================
# SECTION TEMPLATES
# ============================================

SECTION_TEMPLATES = {
    "hero": {
        "name": "Hero Section",
        "preview": "/templates/hero.png",
        "structure": {
            "layout": "full",
            "background": {
                "type": "image",
                "image": "",
                "overlay": "rgba(0,0,0,0.5)"
            },
            "containers": [
                {
                    "width": "100%",
                    "widgets": [
                        {"type": "heading", "content": {"text": "Welcome to Our Website", "tag": "h1"}},
                        {"type": "text", "content": {"html": "<p>Discover amazing services and solutions</p>"}},
                        {"type": "button", "content": {"text": "Get Started", "link": "#"}}
                    ]
                }
            ]
        }
    },
    "features-3col": {
        "name": "3 Column Features",
        "preview": "/templates/features-3col.png",
        "structure": {
            "layout": "boxed",
            "containers": [
                {
                    "width": "33.33%",
                    "widgets": [
                        {"type": "icon-box", "content": {"icon": "star", "title": "Feature 1", "description": "Description"}}
                    ]
                },
                {
                    "width": "33.33%",
                    "widgets": [
                        {"type": "icon-box", "content": {"icon": "zap", "title": "Feature 2", "description": "Description"}}
                    ]
                },
                {
                    "width": "33.33%",
                    "widgets": [
                        {"type": "icon-box", "content": {"icon": "heart", "title": "Feature 3", "description": "Description"}}
                    ]
                }
            ]
        }
    },
    "cta": {
        "name": "Call to Action",
        "preview": "/templates/cta.png",
        "structure": {
            "layout": "boxed",
            "background": {
                "type": "gradient",
                "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            },
            "containers": [
                {
                    "width": "100%",
                    "widgets": [
                        {"type": "heading", "content": {"text": "Ready to Get Started?", "tag": "h2"}},
                        {"type": "text", "content": {"html": "<p>Join us today and experience the difference</p>"}},
                        {"type": "button", "content": {"text": "Start Now", "link": "#"}}
                    ]
                }
            ]
        }
    }
}
